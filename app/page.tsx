import type { CSSProperties } from "react";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import HeaderScroll from "@/components/HeaderScroll";
import MobileMenu from "@/components/MobileMenu";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const stats = [
  { value: "12 dagar", label: "på plats i Gambia" },
  { value: "Max 16", label: "resenärer i gruppen" },
  { value: "4.9/5", label: "snittbetyg från gäster" },
  { value: "16 995 kr", label: "pris per person" },
];

const trips = [
  {
    title: "Gambia Flow Week",
    date: "15-26 okt 2025",
    length: "12 dagar",
    price: "19 900 kr",
    spots: "9 platser kvar",
    includes: ["Boende vid stranden", "Afro dance + styrka", "Kulturkvällar"],
  },
  {
    title: "Roots & Rhythm Escape",
    date: "5-14 feb 2026",
    length: "10 dagar",
    price: "17 900 kr",
    spots: "12 platser kvar",
    includes: ["Workshops med lokala artister", "Dagliga workouts", "Marknad & safari"],
  },
  {
    title: "Family & Community",
    date: "20-30 april 2026",
    length: "11 dagar",
    price: "18 500 kr",
    spots: "6 platser kvar",
    includes: ["Familjevänligt upplägg", "Trygga transfers", "Community-aktiviteter"],
  },
];

const features = [
  {
    title: "Kultur på riktigt",
    text: "Möt lokala guider, artister och entreprenörer som öppnar dörrar till Gambia.",
    icon: "01",
  },
  {
    title: "Rörelse varje dag",
    text: "Afro dance, styrka och flow sessions i soluppgången - nivåanpassat.",
    icon: "02",
  },
  {
    title: "Community först",
    text: "Små grupper, gemensamma middagar och kvällar med musik och storytelling.",
    icon: "03",
  },
  {
    title: "Hållbar närvaro",
    text: "Vi samarbetar lokalt och prioriterar upplevelser som ger tillbaka.",
    icon: "04",
  },
  {
    title: "Trygg logistik",
    text: "Samlad transfer, svensk värd och tydlig planering hela vägen.",
    icon: "05",
  },
  {
    title: "Plats för vila",
    text: "Återhämtning, strandtid och utrymme för egna upptäckter ingår alltid.",
    icon: "06",
  },
];

const itinerary = [
  {
    day: "Dag 1",
    title: "Ankomst & välkomstmiddag",
    text: "Vi landar i Banjul, checkar in vid havet och möts för en gemensam middag.",
  },
  {
    day: "Dag 2",
    title: "Sunrise flow + marknad",
    text: "Mjuk rörelse i gryningen och en färgstark marknadsrunda med lokala smaker.",
  },
  {
    day: "Dag 3",
    title: "Stranddag & återhämtning",
    text: "Fokusera på vila, hav och valfria aktiviteter med gruppen.",
  },
  {
    day: "Dag 4",
    title: "Kulturutflykt & musikstudio",
    text: "Besök byar och kulturcenter, avsluta med musik och rytmworkshop.",
  },
  {
    day: "Dag 5",
    title: "Afro pulse + beach night",
    text: "Intensivare pass på dagen, gemensam kväll med grill och dans.",
  },
  {
    day: "Dag 6",
    title: "Fri dag eller safari",
    text: "Valfri utflykt till naturreservat eller egen tid vid kusten.",
  },
];

const practical = [
  {
    title: "Flyg & transfer",
    text: "Samlad avresa från Sverige. Transfer väntar i Banjul och tar oss direkt till boendet.",
  },
  {
    title: "Visum & pass",
    text: "Visum ordnas vid ankomst. Passet ska vara giltigt minst 6 månader efter hemkomst.",
  },
  {
    title: "Vaccin & försäkring",
    text: "Gula febern rekommenderas. Reseförsäkring ingår via Hemförsäkring eller tillägg.",
  },
  {
    title: "Packlista",
    text: "Lätta träningskläder, badskor, solskydd, myggmedel och en snygg kvällsoutfit.",
  },
];

const reviews = [
  {
    name: "Sofia L.",
    trip: "Gambia Flow 2024",
    rating: 5,
    text: "En perfekt mix av träning, kultur och vila. Kände mig trygg och inspirerad hela tiden.",
  },
  {
    name: "Amir K.",
    trip: "Roots & Rhythm 2024",
    rating: 5,
    text: "Communityn var magisk. Lokala möten och musiken gjorde resan unik.",
  },
  {
    name: "Linnea M.",
    trip: "Family & Community 2023",
    rating: 5,
    text: "Barnen älskade aktiviteterna och vi vuxna fick tid för oss själva. Rekommenderas varmt.",
  },
];

const galleryImages = [
  {
    src: "/images/pic-2.jpeg",
    alt: "Resenärer på strandpromenad",
  },
  {
    src: "/images/pic-3.jpeg",
    alt: "Kulturellt möte i Gambia",
  },
  {
    src: "/images/pic-1.jpeg",
    alt: "Solnedgång och havsutsikt",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.5l2.9 6.1 6.7.8-4.9 4.7 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.4 9.4l6.7-.8L12 2.5z"
    />
  </svg>
);

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header} id="site-header" data-hidden="false">
        <HeaderScroll />
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              HIP <span>AFRO</span> TRAVEL
            </div>
            <nav className={`${styles.nav} ${styles.desktopOnly}`}>
              <a href="#om-resan">Om resan</a>
              <a href="#resor">Resor</a>
              <a href="#program">Program</a>
              <a href="#praktisk-info">Praktisk info</a>
              <a href="#galleri">Galleri</a>
            </nav>
            <a className={`${styles.navButton} ${styles.desktopOnly}`} href="#kontakt">
              Boka resa
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main>
        <section className={`${styles.section} ${styles.hero}`} id="startsida">
          <div className={styles.heroMedia}>
            <HeroVideo
              className={styles.heroVideo}
              src="/videos/hero.mp4"
              poster="/images/pic-1.jpeg"
            />
            <div className={styles.heroOverlay} />
            <div className={styles.heroGlow} />
          </div>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <Reveal className={styles.heroText}>
                <span className={styles.eyebrow}>
                  Gambia | Kultur | Community
                </span>
                <h1 className={styles.heroTitle}>
                  Upplev Gambia där afro-energi möter stilla stränder
                </h1>
                <p className={styles.heroLead}>
                  HIP AFRO TRAVEL skapar temaresor med rörelse, musik och
                  gemenskap. Träning i soluppgången, lokala möten och kvällar som
                  känns långt efter att du landat hemma.
                </p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#kontakt">
                    Boka resa
                  </a>
                  <a className={styles.secondaryButton} href="#resor">
                    Läs mer
                  </a>
                </div>
                <div className={styles.heroStats}>
                  {stats.map((stat) => (
                    <div key={stat.label} className={styles.stat}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal
                className={`${styles.heroCard} ${styles.heroCardDesktop}`}
                style={{ "--reveal-delay": "120ms" } as CSSProperties}
              >
                <div className={styles.heroCardHeader}>
                  <span className={styles.pill}>Nästa resa</span>
                  <span>15-26 okt 2025</span>
                </div>
                <div className={styles.heroCardTitle}>Gambia Flow Week</div>
                <p className={styles.heroCardCopy}>
                  Balanserad mix av träning, kultur och vila - med boende nära
                  havet och guider på plats.
                </p>
                <ul className={styles.heroList}>
                  <li>Boende i Kotu nära stranden</li>
                  <li>Afro-pass & strandträning varje dag</li>
                  <li>Kulturkvällar med lokala artister</li>
                </ul>
                <div className={styles.heroCardFooter}>
                  <span className={styles.price}>från 19 900 kr</span>
                  <a className={styles.ghostButton} href="#program">
                    Se program
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          <div className={styles.scrollIndicator}>
            Scrolla
            <span className={styles.scrollDot} />
          </div>
        </section>

        <div className={styles.heroCardMobileSection}>
          <div className={styles.container}>
            <Reveal className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <span className={styles.pill}>Nästa resa</span>
                <span>15-26 okt 2025</span>
              </div>
              <div className={styles.heroCardTitle}>Gambia Flow Week</div>
              <p className={styles.heroCardCopy}>
                Balanserad mix av träning, kultur och vila - med boende nära
                havet och guider på plats.
              </p>
              <ul className={styles.heroList}>
                <li>Boende i Kotu nära stranden</li>
                <li>Afro-pass & strandträning varje dag</li>
                <li>Kulturkvällar med lokala artister</li>
              </ul>
              <div className={styles.heroCardFooter}>
                <span className={styles.price}>från 19 900 kr</span>
                <a className={styles.ghostButton} href="#program">
                  Se program
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <section className={styles.section} id="galleri">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Galleri</span>
                <h2 className={styles.sectionTitle}>
                  Minnen och ögonblick från resan
                </h2>
              </Reveal>
            </div>
            <div className={styles.galleryWrap}>
              <Reveal className={styles.galleryLoop}>
                <div className={styles.galleryTrack}>
                  {galleryImages.concat(galleryImages).map((image, index) => {
                    const isDuplicate = index >= galleryImages.length;
                    return (
                      <div
                        key={`${image.src}-${index}`}
                        className={styles.gallerySlide}
                        aria-hidden={isDuplicate}
                      >
                        <Image
                          src={image.src}
                          alt={isDuplicate ? "" : image.alt}
                          fill
                          sizes="(max-width: 900px) 70vw, 32vw"
                        />
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.section} id="recensioner">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Recensioner</span>
                <h2 className={styles.sectionTitle}>
                  Röster från resan
                </h2>
                <p className={styles.sectionIntro}>
                  Äkta intryck från gäster som rest med oss.
                </p>
              </Reveal>
            </div>
            <div className={styles.reviewLoop}>
              <div className={styles.reviewTrack}>
                {reviews.map((review) => (
                  <div key={review.name} className={styles.reviewSlide}>
                    <div className={styles.reviewCard}>
                      <div className={styles.reviewTop}>
                        <div>
                          <div className={styles.reviewName}>{review.name}</div>
                          <div className={styles.reviewTrip}>{review.trip}</div>
                        </div>
                        <div
                          className={styles.stars}
                          aria-label={`${review.rating} av 5`}
                        >
                          {Array.from({ length: review.rating }).map(
                            (_, idx) => (
                              <StarIcon key={`${review.name}-${idx}`} />
                            )
                          )}
                        </div>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="resor">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Resor & paket</span>
                <h2 className={styles.sectionTitle}>
                  Kommande resor med afro-vibe
                </h2>
                <p className={styles.sectionIntro}>
                  Välj den resa som matchar din energi. Alla paket inkluderar
                  boende, community, aktiviteter och lokala upplevelser.
                </p>
              </Reveal>
            </div>
            <div className={styles.tripGrid}>
              {trips.map((trip, index) => (
                <Reveal
                  key={trip.title}
                  className={styles.tripCard}
                  style={
                    { "--reveal-delay": `${index * 120}ms` } as CSSProperties
                  }
                >
                  <div className={styles.tripMeta}>
                    <span>{trip.date}</span>
                    <span>{trip.spots}</span>
                  </div>
                  <h3 className={styles.tripTitle}>{trip.title}</h3>
                  <div className={styles.tripMeta}>{trip.length}</div>
                  <ul className={styles.tripDetails}>
                    {trip.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={styles.tripFooter}>
                    <span className={styles.tripPrice}>{trip.price}</span>
                    <a className={styles.tripButton} href="#kontakt">
                      Boka
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="om-resan">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Om HIP AFRO TRAVEL</span>
                <h2 className={styles.sectionTitle}>
                  Resor som känns - från första trumslag till sista våg
                </h2>
                <p className={styles.sectionIntro}>
                  Vi tror på resor som bygger community och ger utrymme för både
                  energi och återhämtning. Gambia är basen där kultur, rytm och
                  värme möter ett tryggt upplägg.
                </p>
              </Reveal>
            </div>
            <div className={styles.aboutGrid}>
              <Reveal className={styles.aboutCard}>
                <p>
                  Vår filosofi är enkel: skapa en helhetsupplevelse där du kan
                  landa, röra dig och möta människor på riktigt. Därför jobbar vi
                  med lokala värdar, små grupper och genomtänkt logistik.
                </p>
                <ul className={styles.aboutList}>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Lokala samarbeten</strong>
                      <div>Guidade upplevelser och kulturmöten varje resa.</div>
                    </div>
                  </li>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Värdar på plats</strong>
                      <div>
                        Svenska instruktörer och gambiska guider som tar hand om
                        gruppen.
                      </div>
                    </div>
                  </li>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Små grupper</strong>
                      <div>Max 16 resenärer för äkta gemenskap.</div>
                    </div>
                  </li>
                </ul>
              </Reveal>
              <Reveal className={styles.mediaFrame}>
                <video
                  src="/videos/vid-1.mp4"
                  poster="/images/pic-2.jpeg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={styles.mediaBadge}>Afro Pulse</div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.section} id="upplevelse">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Upplevelsen</span>
                <h2 className={styles.sectionTitle}>
                  Det här gör resan unik
                </h2>
                <p className={styles.sectionIntro}>
                  En kombination av träning, kultur och community - med plats
                  för vila och egna upptäckter.
                </p>
              </Reveal>
            </div>
            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <Reveal
                  key={feature.title}
                  className={styles.featureCard}
                  style={
                    { "--reveal-delay": `${index * 100}ms` } as CSSProperties
                  }
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="program">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Dag-för-dag</span>
                <h2 className={styles.sectionTitle}>Ett smakprov på veckan</h2>
                <p className={styles.sectionIntro}>
                  Programmet balanserar planerade aktiviteter med frihet. Här är
                  ett exempel på hur dagarna kan se ut.
                </p>
              </Reveal>
            </div>
            <div className={styles.timeline}>
              {itinerary.map((item, index) => (
                <Reveal
                  key={item.day}
                  className={styles.timelineItem}
                  style={
                    { "--reveal-delay": `${index * 120}ms` } as CSSProperties
                  }
                >
                  <div className={styles.timelineDay}>{item.day}</div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineText}>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="praktisk-info">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Praktisk info</span>
                <h2 className={styles.sectionTitle}>
                  Allt du behöver veta inför resan
                </h2>
                <p className={styles.sectionIntro}>
                  Vi guidar dig hela vägen - från första mejl till landning
                  hemma. Här är det viktigaste att planera.
                </p>
              </Reveal>
            </div>
            <div className={styles.infoGrid}>
              {practical.map((item, index) => (
                <Reveal
                  key={item.title}
                  className={styles.infoCard}
                  style={
                    { "--reveal-delay": `${index * 120}ms` } as CSSProperties
                  }
                >
                  <div className={styles.infoTitle}>{item.title}</div>
                  <div className={styles.infoText}>{item.text}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="kontakt">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Kontakt</span>
                <h2 className={styles.sectionTitle}>
                  Redo att resa? Vi hjälper dig hela vägen.
                </h2>
                <p className={styles.sectionIntro}>
                  Fyll i formuläret så hör vi av oss inom 24 timmar med nästa
                  steg och komplett program.
                </p>
              </Reveal>
            </div>
            <Reveal className={styles.contactCard}>
              <div className={styles.contactDetails}>
                <h3>HIP AFRO TRAVEL</h3>
                <p>
                  Gambiaresor med kultur, träning och community. Vi hjälper dig
                  hitta rätt resa och upplägg.
                </p>
                <ul className={styles.contactList}>
                  <li>E-post: info@hipafrotravel.se</li>
                  <li>Telefon: +46 70 123 45 67</li>
                  <li>Instagram: @hipafrotravel</li>
                  <li>Facebook: HIP AFRO TRAVEL</li>
                </ul>
              </div>
              <form className={styles.contactForm}>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Namn"
                  required
                />
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="E-post"
                  required
                />
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                />
                <select className={styles.select} name="trip">
                  <option>Välj resa</option>
                  <option>Gambia Flow Week</option>
                  <option>Roots & Rhythm Escape</option>
                  <option>Family & Community</option>
                </select>
                <textarea
                  className={styles.textarea}
                  name="message"
                  placeholder="Berätta vad du vill uppleva"
                />
                <button className={styles.formButton} type="submit">
                  Skicka förfrågan
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                HIP <span>AFRO</span> TRAVEL
              </div>
              <p>
                Temaresor till Gambia med fokus på kultur, gemenskap och
                upplevelser som stannar kvar.
              </p>
            </div>
            <div className={styles.footerNav}>
              <a href="#om-resan">Om resan</a>
              <a href="#resor">Resor</a>
              <a href="#program">Program</a>
              <a href="#praktisk-info">Praktisk info</a>
              <a href="#kontakt">Kontakt</a>
            </div>
            <div className={styles.footerMeta}>
              (c) 2025 HIP AFRO TRAVEL. Alla rättigheter reserverade.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
