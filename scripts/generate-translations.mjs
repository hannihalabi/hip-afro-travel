import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputFile = path.join(root, "app/translations.json");
const pages = [
  ".next/server/app/index.html",
  ".next/server/app/resevillkor.html",
  ".next/server/app/tack.html",
  ".next/server/app/_not-found.html",
];
const targets = ["en", "de", "fr", "es"];
const dynamicTexts = [
  "Öppnar betalning…",
  "Betalningen kunde inte startas just nu –",
  "skicka en fråga",
  "så hjälper vi dig.",
];

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? match;
  });
}

function normalize(value) {
  return decodeEntities(value).replace(/\s+/g, " ").trim();
}

function shouldTranslate(value) {
  return /[A-Za-zÀ-ÿÅÄÖåäö]/.test(value) && !/^https?:\/\//.test(value);
}

async function extractTexts() {
  const texts = new Set(dynamicTexts);
  for (const page of pages) {
    let html = await readFile(path.join(root, page), "utf8");
    html = html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, "");

    for (const match of html.matchAll(/>([^<>]+)</g)) {
      const value = normalize(match[1]);
      if (value && shouldTranslate(value)) texts.add(value);
    }
    for (const match of html.matchAll(/\b(?:alt|aria-label|placeholder|title)=(?:"([^"]*)"|'([^']*)')/gi)) {
      const value = normalize(match[1] ?? match[2] ?? "");
      if (value && shouldTranslate(value)) texts.add(value);
    }
  }
  return [...texts].sort((a, b) => a.localeCompare(b, "sv"));
}

const lingvaInstances = [
  "https://lingva.ml",
  "https://translate.projectsegfau.lt",
  "https://translate.dr460nf1r3.org",
  "https://lingva.garudalinux.org",
  "https://translate.jae.fi",
];

async function translateBatch(sources, target, batchNumber) {
  const query = sources
    .map((source, index) => `[[HAT_${String(index).padStart(4, "0")}]]\n${source}`)
    .join("\n");
  let lastError;
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      const instance = lingvaInstances[(batchNumber + attempt - 1) % lingvaInstances.length];
      const response = await fetch(`${instance}/api/v1/sv/${target}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: AbortSignal.timeout(45_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (typeof data.translation !== "string" || !data.translation.trim()) {
        throw new Error("Tom översättning");
      }
      const matches = [...data.translation.matchAll(/\[\[HAT_(\d{4})\]\]\s*([\s\S]*?)(?=\[\[HAT_\d{4}\]\]|$)/g)];
      if (matches.length !== sources.length) {
        throw new Error(`Förväntade ${sources.length} delar men fick ${matches.length}`);
      }
      return matches.map((match) => normalize(match[2]));
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
    }
  }
  throw new Error(`Kunde inte batchöversätta till ${target}\n${lastError}`);
}

function createBatches(jobs) {
  const batches = [];
  let batch = [];
  let characters = 0;
  for (const job of jobs) {
    if (
      batch.length &&
      (characters + job.source.length > 2_800 || batch[0].target !== job.target)
    ) {
      batches.push(batch);
      batch = [];
      characters = 0;
    }
    batch.push(job);
    characters += job.source.length + 18;
  }
  if (batch.length) batches.push(batch);
  return batches;
}

async function main() {
  const texts = await extractTexts();
  const catalogs = JSON.parse(await readFile(outputFile, "utf8"));
  const jobs = [];
  for (const target of targets) {
    catalogs[target] ??= {};
    for (const source of texts) {
      if (!catalogs[target][source]) jobs.push({ source, target });
    }
  }

  process.stdout.write(`${texts.length} svenska texter, ${jobs.length} översättningar kvar.\n`);
  const batches = createBatches(jobs);
  let completed = 0;
  const workers = Array.from({ length: 2 }, async (_, workerIndex) => {
    while (batches.length) {
      const batch = batches.shift();
      if (!batch) return;
      const translated = await translateBatch(
        batch.map(({ source }) => source),
        batch[0].target,
        completed + workerIndex
      );
      batch.forEach((job, index) => {
        catalogs[job.target][job.source] = translated[index];
      });
      completed += batch.length;
      process.stdout.write(`${completed}/${jobs.length} översättningar klara.\n`);
      await writeFile(outputFile, `${JSON.stringify(catalogs, null, 2)}\n`);
    }
  });
  await Promise.all(workers);

  for (const target of targets) {
    catalogs[target] = Object.fromEntries(
      Object.entries(catalogs[target])
        .filter(([source]) => texts.includes(source))
        .sort(([a], [b]) => a.localeCompare(b, "sv"))
    );
  }
  await writeFile(outputFile, `${JSON.stringify(catalogs, null, 2)}\n`);
  process.stdout.write(`Klart: ${texts.length * targets.length} katalogposter.\n`);
}

await main();
