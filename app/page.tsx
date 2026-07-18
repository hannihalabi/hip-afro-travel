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

function latestAsset(file: string) {
  return publicAsset(`/pic-latest/${encodeURIComponent(file)}`);
}

const navLinks = [
  { href: "#resor", label: "Resor" },
  { href: "#ingar", label: "Det ingår" },
  { href: "#bilder", label: "Bilder" },
  { href: "#vardar", label: "Värdar" },
];

const heroChips = [
  { icon: "🧘", label: "Yoga med Ewa" },
  { icon: "💪", label: "Träning med Delta" },
  { icon: "🏝️", label: "7 dagar i Gambia" },
  { icon: "👥", label: "Liten grupp" },
];

const trustPoints = [
  { icon: "🇸🇪", label: "Svensk värd på plats" },
  { icon: "🏡", label: "Boende & mat ingår" },
  { icon: "🚐", label: "Transfer & utflykter ingår" },
  { icon: "✈️", label: "Flyg bokas separat" },
];

const launchTrips = [
  {
    id: "ewa-november",
    badge: "Först ut",
    badgeTone: "gold" as const,
    host: "Ewa",
    hostIcon: "🧘",
    title: "Kundaliniyoga & hormonell balans",
    dates: "8–15 nov 2026",
    month: "November 2026",
    price: "17 000 kr",
    room: "del i dubbelrum",
    summary: "Landa i lugnet. En vecka som ger nervsystemet vila och kroppen balans.",
    chips: [
      { icon: "🧘", label: "Kundaliniyoga" },
      { icon: "🫁", label: "Breathwork" },
      { icon: "🌸", label: "Hormonell balans" },
      { icon: "🌅", label: "Vila & värme" },
    ],
    mediaType: "image" as const,
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    mediaPoster: undefined as string | undefined,
    mediaAlt: "Ewa i meditation under palmerna vid havet",
  },
  {
    id: "ewa-februari",
    badge: "Populär vecka",
    badgeTone: "sunset" as const,
    host: "Ewa",
    hostIcon: "🧘",
    title: "Kundaliniyoga & hormonell balans",
    dates: "14–21 feb 2027",
    month: "Februari 2027",
    price: "17 000 kr",
    room: "del i dubbelrum",
    summary: "Samma älskade upplägg – mitt i svenska vintern när kroppen behöver det som mest.",
    chips: [
      { icon: "🧘", label: "Kundaliniyoga" },
      { icon: "🫁", label: "Breathwork" },
      { icon: "🌸", label: "Hormonell balans" },
      { icon: "☀️", label: "Sol i februari" },
    ],
    mediaType: "image" as const,
    mediaSrc: publicAsset("/images/ewa.jpeg"),
    mediaPoster: undefined as string | undefined,
    mediaAlt: "Kundaliniyoga vid havet i Gambia",
  },
  {
    id: "delta",
    badge: "Hög energi",
    badgeTone: "palm" as const,
    host: "Delta",
    hostIcon: "💪",
    title: "Träningsresa med Delta",
    dates: "21–28 feb 2027",
    month: "Februari 2027",
    price: "17 000 kr",
    room: "del i dubbelrum",
    summary: "Styrka, disciplin och glädje – träna med Delta från Gladiatorerna.",
    chips: [
      { icon: "💪", label: "Styrkepass" },
      { icon: "🔥", label: "Alla nivåer" },
      { icon: "🏖️", label: "Strand & grupp" },
      { icon: "😌", label: "Återhämtning" },
    ],
    mediaType: "video" as const,
    mediaSrc: publicAsset(
      `/delta/${encodeURIComponent("WhatsApp Video 2026-05-03 at 20.25.10.mp4")}`
    ),
    mediaPoster: publicAsset("/images/delta.jpeg"),
    mediaAlt: "Delta från Gladiatorerna tränar",
  },
];

const included = [
  { icon: "🚐", label: "Flygplatstransfer" },
  { icon: "🏡", label: "Boende i huset" },
  { icon: "🏋️", label: "Träning alla nivåer" },
  { icon: "🫁", label: "Stretch & breathwork" },
  { icon: "🛶", label: "Utvalda utflykter" },
  { icon: "🍲", label: "Närande lokal mat" },
  { icon: "🇸🇪", label: "Svensk & lokal värd" },
  { icon: "🎁", label: "Verktyg att ta hem" },
];

const galleryImages = [
  {
    src: publicAsset("/images/pic-1.jpeg"),
    alt: "Solstolar och parasoll på stranden i Gambia",
    tag: "Stranden",
    wide: true,
  },
  {
    src: publicAsset("/images/pic-3.jpeg"),
    alt: "Hängmattor under palmer vid havet",
    tag: "Vilan",
    tall: true,
  },
  {
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.51.11.jpeg"),
    alt: "Middag serveras på stranden vid solnedgång",
    tag: "Maten",
  },
  {
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.50.41.jpeg"),
    alt: "Djembetrummor samlade på stranden",
    tag: "Musiken",
  },
  {
    src: publicAsset("/images/pic-2.jpeg"),
    alt: "Färgglada båtar i mangroven",
    tag: "Utflykterna",
    tall: true,
  },
  {
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.38.05.jpeg"),
    alt: "Resenär vid ett jättelikt kapokträd",
    tag: "Äventyret",
  },
  {
    src: latestAsset("WhatsApp Image 2026-02-19 at 21.57.24.jpeg"),
    alt: "Gäster skrattar över en kopp kaffe",
    tag: "Gemenskapen",
  },
  {
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
    mediaType: "video" as const,
    mediaSrc: publicAsset("/videos/vid-1.mp4"),
    mediaPoster: publicAsset("/images/ewa.jpeg"),
    cta: "Res med Ewa",
  },
  {
    id: "delta",
    name: "Delta",
    role: "Gladiatorerna · Styrka · Energi",
    text: "Känd från Gladiatorerna på TV4. Delta leder passen med disciplin, värme och en energi som smittar av sig på hela gruppen.",
    tags: ["📺 Känd från TV4", "💪 Styrka & kondition", "🔥 Alla nivåer", "🤝 Gruppkänsla"],
    mediaType: "image" as const,
    mediaSrc: publicAsset("/images/delta.jpeg"),
    mediaPoster: undefined as string | undefined,
    cta: "Res med Delta",
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

const timeline = [
  { month: "NOV", year: "2026", label: "Yoga med Ewa", dates: "8–15 nov" },
  { month: "FEB", year: "2027", label: "Yoga med Ewa", dates: "14–21 feb" },
  { month: "FEB", year: "2027", label: "Träning med Delta", dates: "21–28 feb" },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" fill="url(#logoSun)" />
      <circle cx="24" cy="19" r="8.5" fill="#FDF8F0" />
      <path
        d="M2 32c4-2.6 8-2.6 12 0s8 2.6 12 0 8-2.6 12-0 6 2.2 8 2.2V46H2z"
        fill="#143826"
      />
      <path
        d="M4 38c3.4-2.2 6.8-2.2 10.2 0s6.8 2.2 10.2 0 6.8-2.2 10.2 0 6.6 2.1 9.4 1.4V46H4z"
        fill="#1E5038"
        opacity="0.85"
      />
      <defs>
        <linearGradient id="logoSun" x1="6" y1="6" x2="42" y2="42">
          <stop stopColor="#F2A93B" />
          <stop offset="1" stopColor="#E85D2F" />
        </linearGradient>
      </defs>
    </svg>
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
    <div className={styles.page}>
      <header className={styles.header} id="site-header" data-hidden="false">
        <HeaderScroll />
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a className={styles.brand} href="#hero" aria-label="Hip Afro Travel">
              <LogoMark className={styles.brandMark} />
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
            <a className={`${styles.navCta} ${styles.desktopOnly}`} href="#boka">
              Boka resa
              <ArrowIcon />
            </a>
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
                  Gambia · Vinter 2026/2027
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
                <a className={styles.primaryButton} href="#resor">
                  Välj din resa
                  <ArrowIcon />
                </a>
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
            <SectionHeader kicker="Välj din resa" title="Tre veckor. Tre energier.">
              Samma varma bas i Gambia – du väljer datum, ledare och fokus.
            </SectionHeader>
            <div className={styles.launchGrid}>
              {launchTrips.map((trip, index) => (
                <Reveal
                  className={styles.launchCard}
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
                    <span className={styles.dateBadge}>
                      <span aria-hidden="true">📅</span> {trip.dates}
                    </span>
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
                    <div className={styles.launchFooter}>
                      <div className={styles.launchPrice}>
                        <strong>{trip.price}</strong>
                        <span>{trip.room}</span>
                      </div>
                      <a className={styles.cardButton} href="#boka">
                        Boka din plats
                        <ArrowIcon />
                      </a>
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
                  <span>{item.label}</span>
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
            <div className={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <Reveal
                  className={`${styles.galleryTile} ${
                    image.wide ? styles.galleryTileWide : ""
                  } ${image.tall ? styles.galleryTileTall : ""}`}
                  key={image.src}
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 700px) 86vw, (max-width: 1100px) 45vw, 30vw"
                  />
                  <span className={styles.galleryTag}>{image.tag}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VÄRDAR ───────────────────────────────────────── */}
        <section className={styles.hostSection} id="vardar">
          <div className={styles.container}>
            <SectionHeader kicker="Dina värdar" title="Två ledare. Var sin superkraft.">
              Du reser aldrig anonymt – Ewa och Delta leder sina veckor
              personligen.
            </SectionHeader>
            <div className={styles.hostGrid}>
              {hosts.map((host, index) => (
                <Reveal
                  className={styles.hostCard}
                  key={host.id}
                  style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                >
                  <div className={styles.hostMedia}>
                    {host.mediaType === "video" ? (
                      <video
                        src={host.mediaSrc}
                        poster={host.mediaPoster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={`${host.name} – ${host.role}`}
                      />
                    ) : (
                      <Image
                        src={host.mediaSrc}
                        alt={`${host.name} – ${host.role}`}
                        fill
                        className={styles.hostImage}
                        sizes="(max-width: 900px) 92vw, 46vw"
                      />
                    )}
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
              Fyra löften som gäller alla tre resorna.
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

        {/* ─── BOKA ─────────────────────────────────────────── */}
        <section className={styles.bookingSection} id="boka">
          <div className={styles.container}>
            <div className={styles.timeline} aria-label="Vinterns tre veckor">
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
                    <select name="trip" defaultValue="Kundaliniyoga med Ewa · 8–15 nov 2026">
                      <option>Kundaliniyoga med Ewa · 8–15 nov 2026</option>
                      <option>Kundaliniyoga med Ewa · 14–21 feb 2027</option>
                      <option>Träningsresa med Delta · 21–28 feb 2027</option>
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
              <LogoMark className={styles.finalCtaMark} />
              <h2>Redo för Gambia?</h2>
              <p>Först in får först välja vecka och rum.</p>
              <a className={styles.primaryButton} href="#boka">
                Skicka intresse nu
                <ArrowIcon />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <LogoMark className={styles.footerMark} />
              <strong>Hip Afro Travel</strong>
            </div>
            <span>Tre resor till Gambia vintern 2026/2027.</span>
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
        <a className={styles.stickyButton} href="#boka">
          Boka nu
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
