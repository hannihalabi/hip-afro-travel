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
  { href: "#resor", label: "Resor" },
  { href: "#bilder", label: "Bilder" },
  { href: "#boka", label: "Boka" },
  { href: "#ewa", label: "Ewa" },
  { href: "#varfor", label: "Varför boka" },
];

const tripFacts = [
  { value: "3 resor", label: "för vintern 2026/2027" },
  { value: "Feb 2027", label: "två fasta veckor redan öppna" },
  { value: "17 000 kr", label: "del i dubbelrum" },
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

const launchTrips = [
  {
    id: "ewa-hormonal-november",
    label: "Resa 1",
    title: "Kundalini yoga Hormonell Balans med Ewa",
    dates: "8-15 november 2026",
    price: "17 000 kr",
    room: "Del i dubbelrum",
    host: "Ewa",
    summary:
      "En vecka för dig som vill ge kroppen lugn, hormonell balans och återhämtning genom kundaliniyoga, andning, meditation och värme.",
    highlights: [
      "Kundaliniyoga",
      "Hormonell balans",
      "Breathwork och meditation",
      "Närvaro, vila och återhämtning",
    ],
    mediaType: "image",
    mediaSrc: publicAsset("/images/pic-1.jpeg"),
    mediaPoster: undefined,
    mediaAlt: "Kundalini yoga Hormonell Balans med Ewa i Gambia",
    note: undefined,
  },
  {
    id: "ewa-hormonal",
    label: "Resa 2",
    title: "Kundalini yoga Hormonell Balans med Ewa",
    dates: "14-21 februari 2027",
    price: "17 000 kr",
    room: "Del i dubbelrum",
    host: "Ewa",
    summary:
      "En vecka för dig som vill ge kroppen lugn, hormonell balans och återhämtning genom kundaliniyoga, andning, meditation och värme.",
    highlights: [
      "Kundaliniyoga",
      "Hormonell balans",
      "Breathwork och meditation",
      "Närvaro, vila och återhämtning",
    ],
    mediaType: "image",
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    mediaPoster: undefined,
    mediaAlt: "Kundalini yoga Hormonell Balans med Ewa",
    note: undefined,
  },
  {
    id: "delta",
    label: "Resa 3",
    title: "Träningsresa med Delta från Gladiatorerna",
    dates: "21-28 februari 2027",
    price: "17 000 kr per person",
    room: "Del i dubbelrum",
    host: "Delta",
    summary:
      "En träningsresa med tydlig energi och karaktär där Delta står i centrum. Veckan kombinerar styrka, disciplin, rörelseglädje och Gambia.",
    highlights: [
      "Träningspass med Delta",
      "Fokus på styrka och disciplin",
      "Sol, strand och gruppkänsla",
      "Tid för återhämtning mellan passen",
    ],
    mediaType: "image",
    mediaSrc: publicAsset("/images/delta.jpeg"),
    mediaPoster: undefined,
    mediaAlt: "Träningsresa med Delta från Gladiatorerna",
    note: undefined,
  },
];

const itinerary = [
  {
    day: "01",
    title: "Kundalini yoga Hormonell Balans med Ewa",
    items: [
      "8-15 november 2026",
      "17 000 kr, del i dubbelrum",
      "Kundaliniyoga, återhämtning och hormonell balans",
    ],
  },
  {
    day: "02",
    title: "Kundalini yoga Hormonell Balans med Ewa",
    items: [
      "14-21 februari 2027",
      "17 000 kr, del i dubbelrum",
      "Kundaliniyoga, återhämtning och hormonell balans",
    ],
  },
  {
    day: "03",
    title: "Träningsresa med Delta från Gladiatorerna",
    items: [
      "21-28 februari 2027",
      "17 000 kr per person, del i dubbelrum",
      "Träningsfokus med Delta och tid för återhämtning",
    ],
  },
];

const benefits = [
  {
    title: "Tre tydliga upplägg",
    text: "Varje vecka har sin egen profil, så du kan välja det datum, den ledare och det fokus som passar dig bäst.",
  },
  {
    title: "Små grupper och trygg struktur",
    text: "Hip Afro Travel håller upplägget personligt med tydlig struktur, lokala kontakter och varm närvaro på plats.",
  },
  {
    title: "Värme, rörelse och vila",
    text: "Gambia ger plats för både energi och återhämtning, med sol, hav, rörelse och tid att komma ned i kroppen.",
  },
  {
    title: "Profiler med eget uttryck",
    text: "Ewa och Delta sätter olika ton på sina veckor, men känslan av närvaro och resa på riktigt är densamma.",
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
  children?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeader}>
      <Reveal>
        <p className={styles.kicker}>{kicker}</p>
        <h2>{title}</h2>
      </Reveal>
      {children ? <p>{children}</p> : null}
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
              <p className={styles.kicker}>Vinter 2026/2027 | Nya resor</p>
              <h1>Hip Afro Travel lanserar sina första tre resor.</h1>
              <p className={styles.heroLead}>
                Först ut kommer två veckor med Kundalini yoga Hormonell Balans
                med Ewa och en träningsresa med Delta från Gladiatorerna. Tre
                olika upplägg, samma värme i Gambia.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#resor">
                  Se resorna
                </a>
                <a className={styles.secondaryButton} href="#boka">
                  Skicka intresse
                </a>
              </div>
              <div className={styles.heroFacts} aria-label="Lanseringens höjdpunkter">
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

        <section className={styles.launchSection} id="resor">
          <div className={styles.container}>
            <SectionHeader
              kicker="Lansering vinter 2026/2027"
              title="Tre lanseringar. Tre olika energier."
            >
              Hip Afro Travel lanserar sina första tre resor till Gambia.
              Uppläggen får olika ton genom Ewa och Delta, men bygger på samma
              känsla av värme, rörelse och liten grupp.
            </SectionHeader>
            <div className={styles.launchGrid}>
              {launchTrips.map((trip) => (
                <Reveal className={styles.launchCard} key={trip.id}>
                  <div className={styles.launchMedia}>
                    {trip.mediaType === "video" ? (
                      <video
                        src={trip.mediaSrc}
                        poster={trip.mediaPoster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={trip.mediaAlt}
                      />
                    ) : (
                      <Image
                        src={trip.mediaSrc}
                        alt={trip.mediaAlt}
                        fill
                        className={styles.launchImage}
                        sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw"
                      />
                    )}
                  </div>
                  <div className={styles.launchCardBody}>
                    <div className={styles.launchMeta}>
                      <span>{trip.label}</span>
                      <strong>{trip.host}</strong>
                    </div>
                    <h3>{trip.title}</h3>
                    <p>{trip.summary}</p>
                    <div className={styles.launchStats}>
                      <span>{trip.dates}</span>
                      <span>{trip.price}</span>
                      <span>{trip.room}</span>
                    </div>
                    {trip.note ? (
                      <p className={styles.launchNote}>{trip.note}</p>
                    ) : null}
                    <ul className={styles.launchHighlights}>
                      {trip.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.gallerySection} id="bilder">
          <div className={styles.container}>
            <SectionHeader
              kicker="Bilder"
              title="Material från Gambia och kommande lanseringar."
            >
              Bilderna ger känslan av platsen, värmen och rytmen som resorna
              bygger vidare på under vintern 2026/2027.
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
                <h2>Tre resor. Ett tydligt upplägg.</h2>
                <p>
                  Hip Afro Travel öppnar nu för intresseanmälan till de första
                  tre resorna för vintern 2026/2027. En vecka ligger i november
                  2026 och två veckor ligger fast i februari 2027 med samma
                  trygga bas i Gambia.
                </p>
                <p>
                  Kontakt: <a href="tel:0701507074">070-1507074</a> och{" "}
                  <a href="mailto:Jennifer.dixon@hipafrotravel.com">
                    Jennifer.dixon@hipafrotravel.com
                  </a>
                </p>
                <div className={styles.priceLine}>
                  <span>Från 17 000 kr</span>
                  <small>del i dubbelrum</small>
                </div>
                <p>Flyg bokas separat och ingår inte i priset.</p>
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
                  <h3>Skicka intresseanmälan</h3>
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
                    Vilken resa gäller det?
                    <select name="trip" defaultValue={launchTrips[0].title}>
                      {launchTrips.map((trip) => (
                        <option key={trip.id}>{trip.title}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Antal resenärer
                    <select name="travelers" defaultValue="1 person">
                      <option>1 person</option>
                      <option>2 personer</option>
                      <option>3+ personer</option>
                    </select>
                  </label>
                  <button type="submit">Skicka intresse</button>
                  <p>
                    Vi återkommer med platsstatus, nästa steg och praktiska
                    detaljer innan du bekräftar din resa.
                  </p>
                  <p>
                    Du kan också kontakta oss direkt på{" "}
                    <a href="tel:0701507074">070-1507074</a> eller{" "}
                    <a href="mailto:Jennifer.dixon@hipafrotravel.com">
                      Jennifer.dixon@hipafrotravel.com
                    </a>
                    .
                  </p>
                </form>
              </Reveal>
            </div>

            <div className={styles.programBlock}>
              <div className={styles.programHeader}>
                <p className={styles.kicker}>Lanseringen i korthet</p>
                <h3>Så ser vintern ut.</h3>
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

        <section className={styles.aboutSection} id="ewa">
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
                <p className={styles.kicker}>Ewa</p>
                <h2>Ewa leder två veckor för hormonell balans.</h2>
                <p>
                  Resorna 8-15 november 2026 och 14-21 februari 2027 är skapade
                  för dig som vill ge nervsystemet lugn och kroppen stöd genom
                  kundaliniyoga, breathwork, meditation och värme. Upplägget
                  bär Ewas sätt att undervisa: tydligt, jordnära och närvarande.
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
                  <span>Kundaliniyoga</span>
                  <span>Andning & återhämtning</span>
                  <span>Små grupper</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.benefitSection} id="varfor">
          <div className={styles.container}>
            <SectionHeader
              kicker="Varför boka"
              title="Tre resor med olika uttryck, samma känsla av Gambia."
            >
              Du väljer inte bara datum. Du väljer ledare, energi och fokus,
              samtidigt som grunden är densamma: varm miljö, liten grupp och
              Hip Afro Travels närvaro på plats.
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
                <h2>Vill du få första tjing på någon av resorna?</h2>
              </div>
              <a className={styles.primaryButton} href="#boka">
                Skicka intresse
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <strong>Hip Afro Travel</strong>
            <span>Tre lanseringar till Gambia för vintern 2026/2027.</span>
            <span>
              Hip Afro Travel drivs som enskild firma. Planering,
              administration och kundkontakt sker i Sverige.
            </span>
            <a href="tel:0701507074">070-1507074</a>
            <a href="mailto:Jennifer.dixon@hipafrotravel.com">
              Jennifer.dixon@hipafrotravel.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
