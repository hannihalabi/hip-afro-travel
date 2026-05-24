import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import HeaderScroll from "@/components/HeaderScroll";
import MobileMenu from "@/components/MobileMenu";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const repo = "hip-afro-travel";
const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.DEPLOY_TARGET === "github-pages";
const publicAssetPrefix =
  process.env.NODE_ENV === "production" && isGitHubPagesBuild ? `/${repo}` : "";

function publicAsset(src: `/${string}`) {
  return `${publicAssetPrefix}${src}`;
}

const navLinks = [
  { href: "#recensioner", label: "Recensioner" },
  { href: "#bilder", label: "Bilder" },
  { href: "#boka", label: "Boka" },
  { href: "#vilka-vi-ar", label: "Vilka vi är" },
  { href: "#varfor", label: "Varför resan" },
];

const tripFacts = [
  { value: "7 dagar", label: "återhämtning" },
  { value: "17 000 kr", label: "per person" },
  { value: "Max 12", label: "i gruppen" },
];

const reviews = [
  {
    name: "Anna S.",
    text: "Tryggt, varmt och välplanerat från första kontakten. Jag kom hem med mer energi än jag haft på länge.",
  },
  {
    name: "Maria K.",
    text: "Träningen, maten och utflykterna blev en perfekt mix. Det kändes personligt, inte som en vanlig paketresa.",
  },
  {
    name: "Karin L.",
    text: "Gambia genom Hip Afro Travel kändes genuint. Vi fick möta människor och platser jag aldrig hittat själv.",
  },
  {
    name: "Sofia R.",
    text: "Lagom mycket program och lagom mycket vila. Jag uppskattade att allt praktiskt redan var löst.",
  },
  {
    name: "Elin M.",
    text: "En vecka som faktiskt gav återhämtning. Gruppkänslan var stark utan att det blev intensivt.",
  },
];

const included = [
  "Flygplatstransfer i Gambia",
  "Boende i huset",
  "Träningspass för alla nivåer",
  "Stretch, rörelse och breathwork",
  "Utvalda utflykter",
  "Närande lokal mat",
  "Svensk och lokal närvaro",
  "Verktyg att ta med hem",
];

const itinerary = [
  {
    day: "Dag 1",
    title: "Ankomst och landning",
    items: [
      "Upphämtning vid flygplatsen",
      "Transfer till huset och incheckning",
      "Tid att landa, lunch och komma till ro",
      "Promenad / hike",
      "Middag kl. 19.30",
    ],
  },
  {
    day: "Dag 2",
    title: "Jogg, stretch och beach workout",
    items: [
      "Jogg & stretch",
      "Frukost",
      "Workshop om baobab, moringa, soursop och hibiskus",
      "Egen tid kl. 12.00-17.00",
      "Beach workout / HIIT-pass",
      "Middag kl. 19.30",
    ],
  },
  {
    day: "Dag 3",
    title: "Kartong och functional movement",
    items: [
      "Dynamisk stretch",
      "Frukost",
      "Utflykt till Kartong",
      "Lunch på egen bekostnad",
      "Båtutflykt till Lamin Lodge",
      "Functional movement-pass",
      "Middag kl. 19.30",
    ],
  },
  {
    day: "Dag 4",
    title: "Workout och funktionell rörelse",
    items: [
      "Jogg & stretch",
      "Frukost",
      "Egen tid kl. 12.00-17.00",
      "Workout & functional movement",
      "Middag kl. 19.30",
    ],
  },
  {
    day: "Dag 5",
    title: "Juffureh",
    items: [
      "Frukost",
      "Heldagsutflykt till Juffureh",
      "Lunch, snacks och dryck ingår",
      "Fri tid på kvällen",
    ],
  },
  {
    day: "Dag 6",
    title: "Self defence och strandmiddag",
    items: [
      "Dynamic stretch",
      "Frukost",
      "Egen tid kl. 12.00-17.00",
      "Self defence & functional movement",
      "Middag kl. 19.30 på stranden",
      "Campfire och avslutningskväll",
    ],
  },
  {
    day: "Dag 7",
    title: "Hemresa",
    items: [
      "Jogg & stretch",
      "Frukost",
      "Egen tid kl. 12.00-16.00",
      "Utcheckning",
      "Transfer och lämning på flygplatsen",
      "Hemresa",
    ],
  },
];

const benefits = [
  {
    title: "Nervsystemet får landa",
    text: "Meditation, mindfulness och andningsövningar hjälper kroppen att växla ned från stress till återhämtning.",
  },
  {
    title: "Näring direkt från jorden",
    text: "Färska lokala råvaror, frukt, grönsaker, fisk, skaldjur och växtbaserade alternativ lagas med omsorg.",
  },
  {
    title: "Verktyg som följer med hem",
    text: "Du får rörelsepass, stretch, andningstekniker och kostinspiration som kan stötta balansen även efter resan.",
  },
  {
    title: "Kom precis som du är",
    text: "Inga förkunskaper krävs. Programmet anpassas för olika nivåer och bygger på vila, närvaro och trygg guidning.",
  },
];

const teacherHighlights = [
  "Certifierad Kundaliniyogalärare sedan 2013",
  "Yoga, breathwork och meditation",
  "Över 20 år med yoga och mindfulness",
  "Insprängt med Tai Chi, näring och positivt mindset",
];

const curatedImages = [
  {
    src: publicAsset("/images/pic-1.jpeg"),
    alt: "Gruppresa med Hip Afro Travel i Gambia",
  },
  {
    src: publicAsset("/images/pic-2.jpeg"),
    alt: "Resenär under en varm dag i Gambia",
  },
  {
    src: publicAsset("/images/pic-3.jpeg"),
    alt: "Strand och vardagsliv under resan",
  },
];

const galleryImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

function toPublicImagePath(file: string) {
  return publicAsset(`/pic-latest/${encodeURIComponent(file)}`);
}

async function getGalleryImages() {
  const galleryDirectory = path.join(process.cwd(), "public", "pic-latest");

  try {
    const files = await fs.readdir(galleryDirectory);
    const latestImages = files
      .filter((file) =>
        galleryImageExtensions.has(path.extname(file).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b, "sv"))
      .map((file, index) => ({
        src: toPublicImagePath(file),
        alt: `Bild från Hip Afro Travel i Gambia ${index + 1}`,
      }));

    return [...curatedImages, ...latestImages].slice(0, 11);
  } catch {
    return curatedImages;
  }
}

function SectionHeader({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.sectionHeader}>
      <Reveal>
        <p className={styles.kicker}>{kicker}</p>
        <h2>{title}</h2>
      </Reveal>
      <p>{children}</p>
    </div>
  );
}

export default async function Home() {
  const galleryImages = await getGalleryImages();

  return (
    <div className={styles.page}>
      <header className={styles.header} id="site-header" data-hidden="false">
        <HeaderScroll />
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a className={styles.brand} href="#hero" aria-label="Hip Afro Travel">
              Hip Afro Travel
            </a>
            <nav className={`${styles.desktopNav} ${styles.desktopOnly}`}>
              {navLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <a className={`${styles.navCta} ${styles.desktopOnly}`} href="#boka">
              Boka resa
            </a>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="hero">
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={publicAsset("/images/pic-1.jpeg")}
            aria-hidden="true"
          >
            <source
              src={publicAsset("/videos/vid-10.mp4")}
              type="video/mp4"
              media="(min-width: 800px)"
            />
            <source src={publicAsset("/videos/hero.mp4")} type="video/mp4" />
          </video>
          <div className={styles.heroShade} />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <Reveal className={styles.heroCopy}>
              <p className={styles.kicker}>Gambia | Träningsresa</p>
              <h1>7 dagar i Gambia med träning och återhämtning.</h1>
              <p className={styles.heroLead}>
                Jogg, stretch, HIIT, functional movement, self defence, sol,
                hav och närande mat från naturen. En vecka skapad för kroppen.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#boka">
                  Boka resa
                </a>
                <a className={styles.secondaryButton} href="#bilder">
                  Se känslan
                </a>
              </div>
              <div className={styles.heroFacts} aria-label="Resans höjdpunkter">
                {tripFacts.map((fact) => (
                  <div className={styles.heroFact} key={fact.label}>
                    <strong>{fact.value}</strong>
                    <span>{fact.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.reviewSection} id="recensioner">
          <div className={styles.container}>
            <SectionHeader
              kicker="Recensioner"
              title="Det som får människor att boka igen."
            >
              Korta röster från resenärer som uppskattat tryggheten,
              gruppkänslan och att Gambia får kännas på riktigt.
            </SectionHeader>
            <div className={styles.reviewScroller} aria-label="Recensioner">
              {reviews.map((review) => (
                <article className={styles.reviewCard} key={review.name}>
                  <div className={styles.rating}>★★★★★</div>
                  <p>{review.text}</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.gallerySection} id="bilder">
          <div className={styles.container}>
            <SectionHeader
              kicker="Bilder"
              title="Sol, människor, mat och dagar som känns levande."
            >
              Riktiga bilder från materialet i projektet. Mindre säljtext,
              mer känsla.
            </SectionHeader>
            <div className={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <Reveal
                  className={`${styles.galleryTile} ${
                    index === 0 || index === 6 ? styles.galleryTileWide : ""
                  } ${index === 2 || index === 8 ? styles.galleryTileTall : ""}`}
                  key={image.src}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 700px) 86vw, (max-width: 1100px) 45vw, 30vw"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.bookingSection} id="boka">
          <div className={styles.container}>
            <div className={styles.bookingGrid}>
              <Reveal className={styles.bookingCopy}>
                <p className={styles.kicker}>Boka</p>
                <h2>En enkel gruppresa. Ett tydligt pris.</h2>
                <p>
                  Resan kostar <strong>17 000 kr per person</strong>. Du får en
                  vecka med träning, stretch, breathwork, utflykter, lokala
                  möten och tid för återhämtning. Passen anpassas för olika
                  nivåer.
                </p>
                <div className={styles.priceLine}>
                  <span>17 000 kr</span>
                  <small>per person</small>
                </div>
                <ul className={styles.includedList}>
                  {included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className={styles.bookingFormWrap}>
                <form
                  className={styles.bookingForm}
                  action="mailto:info@hipafrotravel.se"
                  method="post"
                  encType="text/plain"
                >
                  <h3>Skicka bokningsförfrågan</h3>
                  <label>
                    Namn
                    <input name="name" type="text" required />
                  </label>
                  <label>
                    E-post
                    <input name="email" type="email" required />
                  </label>
                  <label>
                    Telefon
                    <input name="phone" type="tel" />
                  </label>
                  <label>
                    Antal resenärer
                    <select name="travelers" defaultValue="1 person">
                      <option>1 person</option>
                      <option>2 personer</option>
                      <option>3+ personer</option>
                    </select>
                  </label>
                  <button type="submit">Boka resa</button>
                  <p>
                    Vi återkommer med datum, betalningsupplägg, platsstatus och
                    praktiska detaljer innan du bekräftar din resa.
                  </p>
                </form>
              </Reveal>
            </div>

            <div className={styles.programBlock}>
              <div className={styles.programHeader}>
                <p className={styles.kicker}>Träningsresa – Dagsprogram</p>
                <h3>Veckan i korthet.</h3>
              </div>
              <div className={styles.programGrid}>
                {itinerary.map((day, index) => (
                  <article className={styles.dayCard} key={day.day}>
                    <div className={styles.dayMarker} aria-hidden="true">
                      <span>{index + 1}</span>
                    </div>
                    <div className={styles.dayContent}>
                      <div className={styles.dayCardHeader}>
                        <span>{day.day}</span>
                        <h4>{day.title}</h4>
                      </div>
                      <ul>
                        {day.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection} id="vilka-vi-ar">
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <Reveal className={styles.aboutMedia}>
                <video
                  src={publicAsset("/videos/vid-1.mp4")}
                  poster={publicAsset("/images/pic-2.jpeg")}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Reveal>
              <Reveal className={styles.aboutCopy}>
                <p className={styles.kicker}>Vilka vi är</p>
                <h2>Hip Afro Travel och Ewa guidar dig genom veckan.</h2>
                <p>
                  Hip Afro Travel skapar gruppresor där resenärer får känna
                  landet genom människor, mat, rörelse, musik och natur. Vi
                  bygger resan för dig som vill ha trygg struktur utan att
                  tappa närheten till platsen.
                </p>
                <div className={styles.teacherCard}>
                  <h3>Om Ewa</h3>
                  <p>
                    Ewa är svensk yoga-, breathwork- och meditationslärare med
                    bas i Barcelona sedan över 20 år. Hennes resa började i
                    Australien, och sedan 2013 är hon certifierad
                    Kundaliniyogalärare. I undervisningen väver hon även in Tai
                    Chi, näring och ett positivt mindset.
                  </p>
                  <ul>
                    {teacherHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.aboutProof}>
                  <span>Lokala kontakter</span>
                  <span>Träning & återhämtning</span>
                  <span>Små grupper</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.benefitSection} id="varfor">
          <div className={styles.container}>
            <SectionHeader
              kicker="Varför resan är bra"
              title="För dig som känner att kroppen ber om en paus."
            >
              Tempot får sjunka. Sömnen, energin och kroppen får stöd genom
              rörelse, stillhet, andning och näring.
            </SectionHeader>
            <div className={styles.benefitGrid}>
              {benefits.map((benefit) => (
                <Reveal className={styles.benefitCard} key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </Reveal>
              ))}
            </div>
            <div className={styles.finalCta}>
              <div>
                <p className={styles.kicker}>Nästa steg</p>
                <h2>Vill du följa med till Gambia?</h2>
              </div>
              <a className={styles.primaryButton} href="#boka">
                Boka resa
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <strong>Hip Afro Travel</strong>
            <span>Gruppresor till Gambia med träning, kultur och värme.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
