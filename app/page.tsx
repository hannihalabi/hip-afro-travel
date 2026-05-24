import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import HeaderScroll from "@/components/HeaderScroll";
import MobileMenu from "@/components/MobileMenu";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const tripFacts = [
  { value: "7 dagar", label: "yoga, hav och kultur" },
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
    text: "Yogan, maten och utflykterna blev en perfekt mix. Det kändes personligt, inte som en vanlig paketresa.",
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
  "Yogapass och meditation",
  "Utvalda utflykter",
  "Måltider enligt program",
  "Svensk och lokal närvaro",
];

const itinerary = [
  {
    day: "Dag 1",
    title: "Ankomst",
    items: [
      "Upphämtning vid flygplatsen",
      "Transfer, incheckning och lunch",
      "Yoga 17.00-18.30 och middag 19.30",
    ],
  },
  {
    day: "Dag 2",
    title: "Örter, yoga och egen tid",
    items: [
      "Morgonmeditation och frukost",
      "Workshop om baobab, moringa och soursop",
      "Egen tid, yoga och gemensam middag",
    ],
  },
  {
    day: "Dag 3",
    title: "Kartong och Pelikan Island",
    items: [
      "Morgonmeditation och frukost",
      "Utflykt till Kartong och båtutflykt",
      "Yoga på eftermiddagen och middag",
    ],
  },
  {
    day: "Dag 4",
    title: "Lugn dag vid huset",
    items: [
      "Morgonmeditation och frukost",
      "Egen tid 12.00-17.00",
      "Yoga 17.00-18.30 och middag 19.30",
    ],
  },
  {
    day: "Dag 5",
    title: "Lamin Lodge",
    items: [
      "Frukost",
      "Heldagsutflykt till Lamin Lodge",
      "Lunch, snacks och dryck ingår",
    ],
  },
  {
    day: "Dag 6",
    title: "Strandmiddag och avslutning",
    items: [
      "Morgonmeditation och frukost",
      "Egen tid och yogapass",
      "Middag på stranden, campfire och avslutningskväll",
    ],
  },
  {
    day: "Dag 7",
    title: "Hemresa",
    items: [
      "Morgonmeditation och frukost",
      "Egen tid fram till 16.00",
      "Utcheckning, transfer och flygplats",
    ],
  },
];

const benefits = [
  {
    title: "Allt är kurerat",
    text: "Du slipper planera. Vi samlar boende, transfer, yoga, mat och utflykter i en tydlig resa.",
  },
  {
    title: "Lagom stor grupp",
    text: "Max 12 personer gör resan social och personlig utan att kännas trång eller opersonlig.",
  },
  {
    title: "Genuint Gambia",
    text: "Du får uppleva strand, byliv, natur och lokala möten med människor som känner platsen.",
  },
  {
    title: "Återhämtning på riktigt",
    text: "Programmet växlar mellan yoga, meditation, egen tid och upplevelser så kroppen hinner landa.",
  },
];

const curatedImages = [
  {
    src: "/images/pic-1.jpeg",
    alt: "Gruppresa med Hip Afro Travel i Gambia",
  },
  {
    src: "/images/pic-2.jpeg",
    alt: "Resenär under en varm dag i Gambia",
  },
  {
    src: "/images/pic-3.jpeg",
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
  return `/pic-latest/${encodeURIComponent(file)}`;
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
              <a href="#recensioner">Recensioner</a>
              <a href="#bilder">Bilder</a>
              <a href="#boka">Boka</a>
              <a href="#vilka-vi-ar">Vilka vi är</a>
              <a href="#varfor">Varför resan</a>
            </nav>
            <a className={`${styles.navCta} ${styles.desktopOnly}`} href="#boka">
              Boka resa
            </a>
            <MobileMenu />
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
            poster="/images/pic-1.jpeg"
            aria-hidden="true"
          >
            <source
              src="/videos/vid-10.mp4"
              type="video/mp4"
              media="(min-width: 800px)"
            />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroShade} />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <Reveal className={styles.heroCopy}>
              <p className={styles.kicker}>Gruppresa till Gambia</p>
              <h1>7 dagar i Gambia med yoga och värme.</h1>
              <p className={styles.heroLead}>
                En trygg gruppresa med hav, utflykter, meditation och tid att
                landa.
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
            <div className={styles.sectionHeader}>
              <Reveal>
                <p className={styles.kicker}>Recensioner</p>
                <h2>Det som får människor att boka igen.</h2>
              </Reveal>
              <p>
                Korta röster från resenärer som uppskattat tryggheten,
                gruppkänslan och att Gambia får kännas på riktigt.
              </p>
            </div>
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
            <div className={styles.sectionHeader}>
              <Reveal>
                <p className={styles.kicker}>Bilder</p>
                <h2>Sol, människor, mat och dagar som känns levande.</h2>
              </Reveal>
              <p>
                Riktiga bilder från materialet i projektet. Mindre säljtext,
                mer känsla.
              </p>
            </div>
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
                  vecka med yoga, meditation, utflykter, lokala möten och tid
                  för återhämtning.
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
                    Vi återkommer med datum, betalningsupplägg och praktiska
                    detaljer innan du bekräftar din plats.
                  </p>
                </form>
              </Reveal>
            </div>

            <div className={styles.programBlock}>
              <div className={styles.programHeader}>
                <p className={styles.kicker}>Dagsprogram</p>
                <h3>Veckan i korthet.</h3>
              </div>
              <div className={styles.programGrid}>
                {itinerary.map((day, index) => (
                  <details
                    className={styles.dayCard}
                    key={day.day}
                    open={index === 0}
                  >
                    <summary>
                      <span>{day.day}</span>
                      <strong>{day.title}</strong>
                    </summary>
                    <ul>
                      {day.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
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
                  src="/videos/vid-1.mp4"
                  poster="/images/pic-2.jpeg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Reveal>
              <Reveal className={styles.aboutCopy}>
                <p className={styles.kicker}>Vilka vi är</p>
                <h2>En liten resebyrå med hjärtat i Gambia.</h2>
                <p>
                  Hip Afro Travel skapar gruppresor där resenärer får känna
                  landet genom människor, mat, rörelse, musik och natur. Vi
                  bygger resan för dig som vill ha trygg struktur utan att
                  tappa närheten till platsen.
                </p>
                <div className={styles.aboutProof}>
                  <span>Lokala kontakter</span>
                  <span>Svensk reseledning</span>
                  <span>Små grupper</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.benefitSection} id="varfor">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Reveal>
                <p className={styles.kicker}>Varför resan är bra</p>
                <h2>För dig som vill komma bort, men inte resa planlöst.</h2>
              </Reveal>
              <p>
                Resan är byggd för att kännas enkel att säga ja till: tydligt
                pris, tydligt program och mycket mänsklig värme.
              </p>
            </div>
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
            <span>Gruppresor till Gambia med yoga, kultur och värme.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
