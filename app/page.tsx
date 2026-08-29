import type { ReactNode } from "react";
import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import Gallery from "@/components/Gallery";
import HeaderScroll from "@/components/HeaderScroll";
import MobileMenu from "@/components/MobileMenu";
import Reveal from "@/components/Reveal";
import {
  TripCalendarProvider,
  TripCalendarTrigger,
} from "@/components/TripCalendar";
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

function latestAsset(file: string) {
  return publicAsset(`/pic-latest/${encodeURIComponent(file)}`);
}

type TripCategory = "yoga" | "training";
type BadgeTone = "gold" | "sunset" | "palm";
type MediaType = "image" | "video";

type LaunchTrip = {
  id: string;
  category: TripCategory;
  startDate: string;
  endDate: string;
  badge: string;
  badgeTone: BadgeTone;
  host: string;
  hostIcon: string;
  title: string;
  dates: string;
  month: string;
  price: string;
  room: string;
  summary: string;
  chips: { icon: string; label: string }[];
  mediaType: MediaType;
  mediaSrc: string;
  mediaPoster?: string;
  mediaAlt: string;
  itinerary: typeof ewaItinerary;
  isComingSoon?: boolean;
};

const navLinks = [
  { href: "#resor", label: "Resor" },
  { href: "#ingar", label: "Det ingår" },
  { href: "#bilder", label: "Bilder" },
  { href: "#vardar", label: "Värdar" },
];

const heroChips = [
  { icon: "🧘", label: "Yoga med Ewa" },
  { icon: "💪", label: "Delta kommer snart" },
  { icon: "🏝️", label: "7 dagar i Gambia" },
  { icon: "👥", label: "Liten grupp" },
];

const trustPoints = [
  { icon: "🇸🇪", label: "Svensk värd på plats" },
  { icon: "🏡", label: "Boende & mat ingår" },
  { icon: "🚐", label: "Transfer & utflykter ingår" },
  { icon: "✈️", label: "Flyg bokas separat" },
];

const ewaItinerary = [
  {
    day: "Dag 1",
    title: "Ankomst & välkommen",
    text: "Transfer från flygplatsen, incheckning, gemensam middag och introduktion till veckan.",
  },
  {
    day: "Dag 2",
    title: "Landa i kroppen",
    text: "Kundaliniyoga, frukost, tid vid havet och ett mjukt pass med breathwork.",
  },
  {
    day: "Dag 3",
    title: "Hormonell balans",
    text: "Yoga och meditation med fokus på återhämtning, följt av workshop och egen tid.",
  },
  {
    day: "Dag 4",
    title: "Upptäck Gambia",
    text: "Utvald gemensam utflykt, lokala smaker och en lugn kväll tillbaka vid boendet.",
  },
  {
    day: "Dag 5",
    title: "Fördjupning",
    text: "Morgonpraktik, breathwork och gott om utrymme för vila, strand och reflektion.",
  },
  {
    day: "Dag 6",
    title: "Kultur & gemenskap",
    text: "Ett mjukare pass, lokal upplevelse och gemensam middag med gruppen.",
  },
  {
    day: "Dag 7",
    title: "Integrera veckan",
    text: "Avslutande yogapass, fri tid och en gemensam cirkel som knyter ihop upplevelsen.",
  },
  {
    day: "Dag 8",
    title: "Hemresa",
    text: "Frukost, utcheckning och gemensam transfer till flygplatsen.",
  },
];

const launchTrips: LaunchTrip[] = [
  {
    id: "resa-1",
    category: "yoga",
    startDate: "2026-02-10",
    endDate: "2026-02-17",
    badge: "Bokning öppen",
    badgeTone: "gold",
    host: "Ewa",
    hostIcon: "🧘",
    title: "Kundaliniyoga & hormonell balans",
    dates: "10–17 feb 2026",
    month: "Februari 2026",
    price: "17 000 kr",
    room: "del i dubbelrum",
    summary: "Landa i lugnet. En vecka som ger nervsystemet vila och kroppen balans.",
    chips: [
      { icon: "🧘", label: "Kundaliniyoga" },
      { icon: "🫁", label: "Breathwork" },
      { icon: "🌸", label: "Hormonell balans" },
      { icon: "🌅", label: "Vila & värme" },
    ],
    mediaType: "image",
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    mediaPoster: undefined as string | undefined,
    mediaAlt: "Ewa i meditation under palmerna vid havet",
    itinerary: ewaItinerary,
  },
  {
    id: "resa-2",
    category: "yoga",
    startDate: "2026-02-21",
    endDate: "2026-02-28",
    badge: "Bokning öppen",
    badgeTone: "sunset",
    host: "Ewa",
    hostIcon: "🧘",
    title: "Kundaliniyoga & hormonell balans",
    dates: "21–28 feb 2026",
    month: "Februari 2026",
    price: "17 000 kr",
    room: "del i dubbelrum",
    summary: "Samma älskade upplägg – mitt i svenska vintern när kroppen behöver det som mest.",
    chips: [
      { icon: "🧘", label: "Kundaliniyoga" },
      { icon: "🫁", label: "Breathwork" },
      { icon: "🌸", label: "Hormonell balans" },
      { icon: "☀️", label: "Sol i februari" },
    ],
    mediaType: "image",
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    mediaPoster: undefined as string | undefined,
    mediaAlt: "Kundaliniyoga vid havet i Gambia",
    itinerary: ewaItinerary,
  },
  {
    id: "delta",
    category: "training",
    startDate: "2026-03-01",
    endDate: "2026-03-08",
    badge: "Kommer snart",
    badgeTone: "palm",
    host: "Delta",
    hostIcon: "💪",
    title: "Träningsresa med Delta",
    dates: "Datum presenteras snart",
    month: "Förhandsvisning",
    price: "Intresseanmälan öppnar senare",
    room: "håll utkik efter datum och pris",
    summary: "Styrka, energi och gemenskap – en kommande träningsresa med Delta.",
    chips: [
      { icon: "💪", label: "Styrkepass" },
      { icon: "🔥", label: "Alla nivåer" },
      { icon: "🏖️", label: "Strand & grupp" },
      { icon: "🤝", label: "Gruppkänsla" },
    ],
    mediaType: "video",
    mediaSrc: publicAsset(
      `/delta/${encodeURIComponent("WhatsApp Video 2026-05-03 at 20.25.10.mp4")}`
    ),
    mediaPoster: publicAsset("/images/delta.jpeg"),
    mediaAlt: "Delta från Gladiatorerna tränar",
    itinerary: [],
    isComingSoon: true,
  },
];

const calendarTrips = launchTrips
  .filter((trip) => !trip.isComingSoon)
  .map((trip) => ({
    id: trip.id,
    category: trip.category,
    title: trip.title,
    host: trip.host,
    hostIcon: trip.hostIcon,
    dates: trip.dates,
    startDate: trip.startDate,
    endDate: trip.endDate,
    price: trip.price,
  }));

const included = [
  { icon: "🚐", label: "Flygplatstransfer" },
  { icon: "🏡", label: "Boende i huset" },
  { icon: "🏋️", label: "Träning alla nivåer" },
  { icon: "🫁", label: "Stretch & breathwork" },
  { icon: "🛶", label: "Utvalda utflykter" },
  {
    icon: "🍽️",
    label: "Matmeny för alla",
    detail: "Fisk · Kött · Vegetariskt · Veganskt",
  },
  { icon: "🇸🇪", label: "Svensk & lokal värd" },
  { icon: "🎁", label: "Verktyg att ta hem" },
];

const galleryImages = [
  {
    mediaType: "image" as const,
    src: publicAsset("/images/pic-1.jpeg"),
    alt: "Solstolar och parasoll på stranden i Gambia",
    tag: "Stranden",
    wide: true,
  },
  {
    mediaType: "image" as const,
    src: publicAsset("/images/pic-3.jpeg"),
    alt: "Hängmattor under palmer vid havet",
    tag: "Vilan",
    tall: true,
  },
  {
    mediaType: "image" as const,
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.51.11.jpeg"),
    alt: "Middag serveras på stranden vid solnedgång",
    tag: "Maten",
  },
  {
    mediaType: "video" as const,
    src: publicAsset("/videos/vid-1.mp4"),
    poster: latestAsset("WhatsApp Image 2026-02-19 at 21.50.41.jpeg"),
    alt: "Gemensam trumaktivitet i Gambia",
    tag: "Musiken",
  },
  {
    mediaType: "image" as const,
    src: publicAsset("/images/pic-2.jpeg"),
    alt: "Färgglada båtar i mangroven",
    tag: "Utflykterna",
    tall: true,
  },
  {
    mediaType: "image" as const,
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.38.05.jpeg"),
    alt: "Resenär vid ett jättelikt kapokträd",
    tag: "Äventyret",
  },
  {
    mediaType: "image" as const,
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.57.24.jpeg"),
    alt: "Gäster skrattar över en kopp kaffe",
    tag: "Gemenskapen",
  },
  {
    mediaType: "image" as const,
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.38.05 (1).jpeg"),
    alt: "Mangrovefloden i kvällsljus",
    tag: "Naturen",
    wide: true,
  },
];

const hosts = [
  {
    id: "ewa",
    name: "Ewa",
    role: "Kundaliniyoga · Breathwork · Meditation",
    text: "Svensk yogalärare med bas i Barcelona. Certifierad Kundaliniyogalärare sedan 2013 och över 20 år med yoga och mindfulness.",
    tags: ["🧘 Certifierad 2013", "🌍 20+ år erfarenhet", "🫁 Breathwork", "🥗 Näring & mindset"],
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    cta: "Res med Ewa",
  },
  {
    id: "delta",
    name: "Delta",
    role: "Kommer snart",
    text: "Mer information om Delta och kommande träningsresor publiceras snart.",
    tags: ["💪 Styrka", "🔥 Energi", "🤝 Gruppkänsla", "⏳ Kommer snart"],
    mediaSrc: publicAsset("/images/delta.jpeg"),
    cta: "Kommer snart",
  },
];

const benefits = [
  {
    icon: "🎯",
    title: "Välj din energi",
    text: "Lugn yoga eller svettig träning – du väljer vecka, ledare och fokus.",
  },
  {
    icon: "👥",
    title: "Liten grupp",
    text: "Personligt upplägg med begränsat antal platser per resa.",
  },
  {
    icon: "🤝",
    title: "Trygg på plats",
    text: "Svensk värd och lokala kontakter finns med dig hela veckan.",
  },
  {
    icon: "☀️",
    title: "Sol mitt i vintern",
    text: "Gambia bjuder på värme, hav och energi när Sverige är som gråast.",
  },
];

const experienceQuotes = [
  {
    theme: "Energi & balans",
    quote:
      "En fantastisk blandning av rörelse, avkoppling och upplevelser – precis den paus från vardagen jag behövde.",
  },
  {
    theme: "Tryggt & personligt",
    quote:
      "Jag kände mig välkommen från första dagen. Den lilla gruppen gjorde resan både personlig och avslappnad.",
  },
  {
    theme: "Gemenskap",
    quote:
      "Det bästa var människorna, skratten och känslan av att uppleva Gambia tillsammans på riktigt.",
  },
];

const timeline = [
  { month: "FEB", year: "2026", label: "Kundaliniyoga med Ewa", dates: "10–17 feb" },
  { month: "FEB", year: "2026", label: "Kundaliniyoga med Ewa", dates: "21–28 feb" },
  { month: "SNART", year: "", label: "Träningsresa med Delta", dates: "Kommer snart" },
];

function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src={publicAsset("/logo/hipafro-logo.jpeg")}
      alt=""
      width={1024}
      height={1024}
      sizes="112px"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrowIcon}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 10h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
        {children ? <p className={styles.sectionLead}>{children}</p> : null}
      </Reveal>
    </div>
  );
}

export default function Home() {
  return (
    <TripCalendarProvider trips={calendarTrips}>
      <div className={styles.page}>
      <header className={styles.header} id="site-header" data-hidden="false">
        <HeaderScroll />
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a className={styles.brand} href="#hero" aria-label="Hip Afro Travel">
              <BrandLogo className={styles.brandMark} />
              <span className={styles.brandText}>
                Hip Afro <em>Travel</em>
              </span>
            </a>
            <nav className={`${styles.desktopNav} ${styles.desktopOnly}`}>
              {navLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <TripCalendarTrigger
              className={`${styles.navCta} ${styles.desktopOnly}`}
            >
              Boka resa
              <ArrowIcon />
            </TripCalendarTrigger>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </header>

      <main>
        {/* ─── HERO ─────────────────────────────────────────── */}
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
              <p className={styles.heroPill}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>
                  Gambia · Februari 2026
                  <span className={styles.mobileHide}> · Bokningen är öppen</span>
                </span>
              </p>
              <h1>
                Träna. Andas.
                <br />
                <span className={styles.heroAccent}>Landa i Gambia.</span>
              </h1>
              <p className={styles.heroLead}>
                Sju dagar av sol, rörelse och återhämtning – med allt ordnat
                på plats.
              </p>
              <div className={styles.heroActions}>
                <TripCalendarTrigger className={styles.primaryButton}>
                  Välj din resa
                  <ArrowIcon />
                </TripCalendarTrigger>
                <a className={styles.secondaryButton} href="#bilder">
                  Se bilderna
                </a>
              </div>
              <div className={styles.heroChips} aria-label="Snabbfakta">
                {heroChips.map((chip) => (
                  <span className={styles.chip} key={chip.label}>
                    <span aria-hidden="true">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <a className={styles.scrollCue} href="#trust" aria-label="Bläddra ner">
            <span />
          </a>
        </section>

        {/* ─── TRUST STRIP ──────────────────────────────────── */}
        <div className={styles.trustStrip} id="trust">
          <div className={styles.container}>
            <ul className={styles.trustList}>
              {trustPoints.map((point) => (
                <li key={point.label}>
                  <span aria-hidden="true">{point.icon}</span>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── RESOR ────────────────────────────────────────── */}
        <section className={styles.launchSection} id="resor">
          <div className={styles.container}>
            <SectionHeader kicker="Välj din resa" title="Resor med sol, rörelse och återhämtning.">
              Två februaridatum är öppna för bokning – och Delta kommer snart.
            </SectionHeader>
            <div className={styles.launchGrid}>
              {launchTrips.map((trip, index) => (
                <Reveal
                  className={styles.launchCard}
                  id={`resa-${trip.id}`}
                  key={trip.id}
                  style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                >
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
                    <span
                      className={styles.cardBadge}
                      data-tone={trip.badgeTone}
                    >
                      {trip.badge}
                    </span>
                    {!trip.isComingSoon ? (
                      <span className={styles.dateBadge}>
                        <span aria-hidden="true">📅</span> {trip.dates}
                      </span>
                    ) : null}
                    <span className={styles.hostBadge}>
                      <span aria-hidden="true">{trip.hostIcon}</span>
                      Med {trip.host}
                    </span>
                  </div>
                  <div className={styles.launchCardBody}>
                    <h3>{trip.title}</h3>
                    <p className={styles.launchSummary}>{trip.summary}</p>
                    <div className={styles.chipRow}>
                      {trip.chips.map((chip) => (
                        <span className={styles.chipSmall} key={chip.label}>
                          <span aria-hidden="true">{chip.icon}</span>
                          {chip.label}
                        </span>
                      ))}
                    </div>
                    {trip.itinerary.length > 0 ? (
                      <details className={styles.tripDetails}>
                        <summary>
                          <span>
                            <strong>Läs mer om resan</strong>
                            <small>Se upplägget dag för dag</small>
                          </span>
                          <span className={styles.detailsIcon} aria-hidden="true" />
                        </summary>
                        <div className={styles.itinerary}>
                          <p className={styles.itineraryNote}>
                            Preliminärt upplägg – tider och aktiviteter kan
                            justeras efter väder och lokala förutsättningar.
                          </p>
                          <ol className={styles.itineraryList}>
                            {trip.itinerary.map((item) => (
                              <li key={item.day}>
                                <span>{item.day}</span>
                                <div>
                                  <strong>{item.title}</strong>
                                  <p>{item.text}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </details>
                    ) : (
                      <div className={styles.comingSoonNote}>
                        Datum, upplägg och bokning presenteras när programmet
                        är klart.
                      </div>
                    )}
                    <div className={styles.launchFooter}>
                      <div className={styles.launchPrice}>
                        <strong>{trip.price}</strong>
                        <span>{trip.room}</span>
                      </div>
                      {trip.isComingSoon ? (
                        <button
                          type="button"
                          className={`${styles.cardButton} ${styles.cardButtonDisabled}`}
                          disabled
                        >
                          Ej bokningsbar än
                        </button>
                      ) : (
                        <CheckoutButton
                          tripId={trip.id}
                          className={styles.cardButton}
                        >
                          Boka & betala
                          <ArrowIcon />
                        </CheckoutButton>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.seatsNote}>
              <span className={styles.liveDotDark} aria-hidden="true" />
              Begränsat antal platser per vecka
            </Reveal>
          </div>
        </section>

        {/* ─── DET INGÅR ────────────────────────────────────── */}
        <section className={styles.includedSection} id="ingar">
          <div className={styles.container}>
            <SectionHeader kicker="Enkelt att förstå" title="Allt detta ingår.">
              Ett pris, inga överraskningar. Du bokar bara flyget själv.
            </SectionHeader>
            <div className={styles.includedGrid}>
              {included.map((item, index) => (
                <Reveal
                  className={styles.includedTile}
                  key={item.label}
                  style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                >
                  <span className={styles.includedIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.includedCopy}>
                    <strong>{item.label}</strong>
                    {item.detail ? <small>{item.detail}</small> : null}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.flightNote}>
              <span aria-hidden="true">✈️</span> Flyg bokas separat
              <span className={styles.mobileHide}>&nbsp;och ingår inte i priset</span>
            </Reveal>
          </div>
        </section>

        {/* ─── BILDER ───────────────────────────────────────── */}
        <section className={styles.gallerySection} id="bilder">
          <div className={styles.container}>
            <SectionHeader kicker="Känslan på plats" title="Se det med egna ögon.">
              Stranden, maten, musiken och människorna – precis som det ser ut
              på riktigt.
            </SectionHeader>
            <Gallery items={galleryImages} />
          </div>
        </section>

        {/* ─── VÄRDAR ───────────────────────────────────────── */}
        <section className={styles.hostSection} id="vardar">
          <div className={styles.container}>
            <SectionHeader kicker="Dina värdar" title="Personligt, tryggt och nära.">
              Du reser aldrig anonymt – Ewa leder resorna personligen och mer
              om Delta kommer snart.
            </SectionHeader>
            <div className={styles.hostGrid}>
              {hosts.map((host, index) => (
                <Reveal
                  className={styles.hostCard}
                  key={host.id}
                  style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                >
                  <div className={styles.hostMedia}>
                    <Image
                      src={host.mediaSrc}
                      alt={`${host.name} – ${host.role}`}
                      fill
                      className={styles.hostImage}
                      sizes="(max-width: 900px) 92vw, 46vw"
                    />
                  </div>
                  <div className={styles.hostBody}>
                    <h3>{host.name}</h3>
                    <p className={styles.hostRole}>{host.role}</p>
                    <p className={styles.hostText}>{host.text}</p>
                    <div className={styles.chipRow}>
                      {host.tags.map((tag) => (
                        <span className={styles.chipSmall} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a className={styles.hostCta} href="#boka">
                      {host.cta}
                      <ArrowIcon />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VARFÖR ───────────────────────────────────────── */}
        <section className={styles.benefitSection} id="varfor">
          <div className={styles.container}>
            <SectionHeader kicker="Varför Hip Afro Travel" title="Därför bokar man oss.">
              Fyra löften som gäller båda resorna.
            </SectionHeader>
            <div className={styles.benefitGrid}>
              {benefits.map((benefit, index) => (
                <Reveal
                  className={styles.benefitCard}
                  key={benefit.title}
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <span className={styles.benefitIcon} aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── KÄNSLAN ──────────────────────────────────────── */}
        <section className={styles.voiceSection}>
          <div className={styles.container}>
            <SectionHeader
              kicker="Känslan vi vill skapa"
              title="Ord att ta med sig hem."
            >
              Exempel på hur veckan är tänkt att upplevas – varmt, personligt
              och fullt av ny energi.
            </SectionHeader>
            <div className={styles.voiceGrid}>
              {experienceQuotes.map((item, index) => (
                <Reveal
                  className={styles.voiceCard}
                  key={item.theme}
                  style={{
                    "--reveal-delay": `${index * 100}ms`,
                  } as React.CSSProperties}
                >
                  <span className={styles.quoteMark} aria-hidden="true">
                    “
                  </span>
                  <blockquote>{item.quote}</blockquote>
                  <span className={styles.voiceTheme}>{item.theme}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BOKA ─────────────────────────────────────────── */}
        <section className={styles.bookingSection} id="boka">
          <div className={styles.container}>
            <div className={styles.timeline} aria-label="Vinterns två resor">
              {timeline.map((stop, index) => (
                <div className={styles.timelineStop} key={`${stop.dates}-${stop.label}`}>
                  <span className={styles.timelineDot} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className={styles.timelineInfo}>
                    <strong>
                      {stop.month} {stop.year}
                    </strong>
                    <span>{stop.label}</span>
                    <small>{stop.dates}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.bookingGrid}>
              <Reveal className={styles.bookingCopy}>
                <p className={styles.kicker}>Boka</p>
                <h2>Säkra din plats i solen.</h2>
                <div className={styles.priceLine}>
                  <span className={styles.priceEyebrow}>Från</span>
                  <strong className={styles.priceAmount}>17 000 kr</strong>
                  <small>per person, del i dubbelrum</small>
                </div>
                <ul className={styles.bookingChecklist}>
                  <li>Ingen betalning nu</li>
                  <li>Vi återkommer med platsstatus</li>
                  <li>Du bekräftar när allt känns rätt</li>
                </ul>
                <div className={styles.contactRow}>
                  <a className={styles.contactChip} href="tel:0701507074">
                    <span aria-hidden="true">📞</span> 070-150 70 74
                  </a>
                  <a
                    className={styles.contactChip}
                    href="mailto:Jennifer.dixon@hipafrotravel.com"
                  >
                    <span aria-hidden="true">✉️</span> Mejla oss
                  </a>
                </div>
              </Reveal>

              <Reveal className={styles.bookingFormWrap}>
                <form
                  className={styles.bookingForm}
                  action="mailto:info@hipafrotravel.se"
                  method="post"
                  encType="text/plain"
                >
                  <h3>Skicka intresseanmälan</h3>
                  <p className={styles.formHint}>
                    Tar under en minut · Inte bindande
                  </p>
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
                    <select name="trip" defaultValue="Kundaliniyoga med Ewa · 10–17 feb 2026">
                      <option>Kundaliniyoga med Ewa · 10–17 feb 2026</option>
                      <option>Kundaliniyoga med Ewa · 21–28 feb 2026</option>
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
                  <button type="submit" className={styles.formButton}>
                    Skicka intresse
                    <ArrowIcon />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────── */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <Reveal className={styles.finalCtaInner}>
              <BrandLogo className={styles.finalCtaMark} />
              <h2>Redo för Gambia?</h2>
              <TripCalendarTrigger className={styles.primaryButton}>
                Visa reskalender
                <ArrowIcon />
              </TripCalendarTrigger>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <BrandLogo className={styles.footerMark} />
              <strong>Hip Afro Travel</strong>
            </div>
            <span>Två resor till Gambia i februari 2026.</span>
            <span>
              Hip Afro Travel drivs som enskild firma. Planering,
              administration och kundkontakt sker i Sverige.
            </span>
            <div className={styles.footerContact}>
              <a href="tel:0701507074">070-150 70 74</a>
              <a href="mailto:Jennifer.dixon@hipafrotravel.com">
                Jennifer.dixon@hipafrotravel.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobil-CTA */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyPrice}>
          <span>Från</span>
          <strong>17 000 kr</strong>
        </div>
        <TripCalendarTrigger className={styles.stickyButton}>
          Välj resa
          <ArrowIcon />
        </TripCalendarTrigger>
      </div>
      </div>
    </TripCalendarProvider>
  );
}
