import fs from "node:fs/promises";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import HeaderScroll from "@/components/HeaderScroll";
import MobileMenu from "@/components/MobileMenu";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const stats = [
  { value: "7 dagar", label: "av djup återhämtning" },
  { value: "Max 12", label: "deltagare i gruppen" },
  { value: "Kundalini", label: "yoga & breathwork" },
  { value: "Gambia", label: "sol, hav & näring" },
];

const trips = [
  {
    title: "7 dagar i Gambia – Hormonell Balans",
    date: "Kommande datum",
    length: "7 dagar",
    price: "Kontakta oss",
    spots: "Begränsat antal platser",
    includes: ["Kundaliniyoga för alla nivåer", "Meditation & breathwork", "Lokalodlad mat från vår farm"],
  },
];

const features = [
  {
    title: "Kundaliniyoga",
    text: "Anpassad för alla nivåer – inga förkunskaper krävs. Du behöver bara komma som du är.",
    icon: "01",
  },
  {
    title: "Meditation & Mindfulness",
    text: "Dagliga sessioner för nervsystemet – stillhet och närvaro som stöttar kroppen.",
    icon: "02",
  },
  {
    title: "Andningsövningar",
    text: "Breathwork-tekniker för hormonell balans och stressreglering att ta med hem.",
    icon: "03",
  },
  {
    title: "Näring från naturen",
    text: "Färsk mat från vår egen farm – soursop, baobab och hibiskus i varje måltid.",
    icon: "04",
  },
  {
    title: "Sol, hav & vila",
    text: "Sju dagar där solen värmer huden och havet lugnar sinnet – utan krav.",
    icon: "05",
  },
  {
    title: "Genuint Gambia",
    text: "Bortom turiststråken – vi delar våra smultronställen och lokala rötter.",
    icon: "06",
  },
];

const itinerary = [
  {
    day: "Dag 1",
    title: "Ankomst & välkommen",
    text: "Landning i Banjul, incheckning och en varm välkomstmiddag med lokala råvaror.",
  },
  {
    day: "Dag 2",
    title: "Sunrise Kundalini + strandvila",
    text: "Mjukt yogapass i gryningen, meditation vid havet och eftermiddag för återhämtning.",
  },
  {
    day: "Dag 3",
    title: "Breathwork & näring",
    text: "Andningsövningar för hormonell balans och gemensam matlagning med farmens råvaror.",
  },
  {
    day: "Dag 4",
    title: "Kulturutflykt & stillhet",
    text: "Besök lokala platser som betyder något för oss – sedan tid för egna reflektioner.",
  },
  {
    day: "Dag 5",
    title: "Djupare practice",
    text: "Intensivare yoga och meditation, kvällsceremoni med teer av soursop och hibiskus.",
  },
  {
    day: "Dag 6",
    title: "Fri dag vid havet",
    text: "Stranddag, valfria aktiviteter eller vila – utrymme för egna upptäckter.",
  },
  {
    day: "Dag 7",
    title: "Integration & hemresa",
    text: "Avslutande cirkel, verktyg att ta med hem och farewell-middag med gruppen.",
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
    name: "Anna S.",
    trip: "Gambia Yoga Retreat 2024",
    rating: 5,
    text: "En otrolig vecka. Ewa är en fantastisk lärare och maten från farmen var magisk. Jag kom hem med ett lugn jag inte känt på år.",
  },
  {
    name: "Maria K.",
    trip: "Gambia Yoga Retreat 2024",
    rating: 5,
    text: "Yogapassen var perfekta – anpassade till alla nivåer. Andningsövningarna har förändrat hur jag hanterar stress. Rekommenderas varmt!",
  },
  {
    name: "Karin L.",
    trip: "Gambia Yoga Retreat 2023",
    rating: 5,
    text: "Gambia är ett underbart land och att uppleva det med lokala guider som verkligen bryr sig gör all skillnad. En resa för livet.",
  },
];

const galleryImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

async function getLatestGalleryImages() {
  const galleryDirectory = path.join(process.cwd(), "public", "pic-latest");

  try {
    const files = await fs.readdir(galleryDirectory);

    return files
      .filter((file) =>
        galleryImageExtensions.has(path.extname(file).toLowerCase())
      )
      .sort((a, b) => b.localeCompare(a, "sv"))
      .map((file, index) => ({
        src: `/pic-latest/${encodeURIComponent(file)}`,
        alt: `Bild från HIP AFRO TRAVEL i Gambia ${index + 1}`,
      }));
  } catch {
    return [];
  }
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.5l2.9 6.1 6.7.8-4.9 4.7 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.4 9.4l6.7-.8L12 2.5z"
    />
  </svg>
);

export default async function Home() {
  const galleryImages = await getLatestGalleryImages();

  return (
    <div className={styles.page}>
      <header className={styles.header} id="site-header" data-hidden="false">
        <HeaderScroll />
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              Gambia <span>Yoga</span> Retreat
            </div>
            <nav className={`${styles.nav} ${styles.desktopOnly}`}>
              <a href="#resor">Retreat</a>
              <a href="#om-resan">Om oss</a>
              <a href="#om-ewa">Om Ewa</a>
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
                  Gambia | Kundaliniyoga | Hormonell Balans
                </span>
                <h1 className={styles.heroTitle}>
                  7 dagar i Gambia – återställ din hormonella balans
                </h1>
                <p className={styles.heroLead}>
                  Kundaliniyoga, meditation, sol, hav och närande mat från naturen.
                  En vecka skapad för dig som längtar efter återhämtning, balans
                  och en djupare kontakt med din kropp.
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
                  <span className={styles.pill}>Retreat</span>
                  <span>Gambia 2025/2026</span>
                </div>
                <div className={styles.heroCardTitle}>7 dagar – Hormonell Balans</div>
                <p className={styles.heroCardCopy}>
                  En vecka för dig – precis som du är. Inga förkunskaper krävs.
                </p>
                <ul className={styles.heroList}>
                  <li>Kundaliniyoga anpassad för alla nivåer</li>
                  <li>Andningsövningar & meditation</li>
                  <li>Lokalodlad mat & naturliga örter</li>
                </ul>
                <div className={styles.heroCardFooter}>
                  <span className={styles.price}>Kontakta oss</span>
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
                <span className={styles.pill}>Retreat</span>
                <span>Gambia 2025/2026</span>
              </div>
              <div className={styles.heroCardTitle}>7 dagar – Hormonell Balans</div>
              <p className={styles.heroCardCopy}>
                En vecka för dig – precis som du är. Inga förkunskaper krävs.
              </p>
              <ul className={styles.heroList}>
                <li>Kundaliniyoga anpassad för alla nivåer</li>
                <li>Andningsövningar & meditation</li>
                <li>Lokalodlad mat & naturliga örter</li>
              </ul>
              <div className={styles.heroCardFooter}>
                <span className={styles.price}>Kontakta oss</span>
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
              {galleryImages.length > 0 ? (
                galleryImages.map((image, index) => {
                  const isWide = index % 6 === 0 || index % 6 === 5;

                  return (
                    <Reveal
                      key={image.src}
                      className={`${styles.galleryItem} ${
                        isWide ? styles.galleryItemWide : ""
                      }`}
                      style={
                        {
                          "--reveal-delay": `${(index % 6) * 70}ms`,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className={styles.galleryImage}
                        sizes="(max-width: 420px) 94vw, (max-width: 900px) 47vw, (max-width: 1280px) 31vw, 23vw"
                      />
                    </Reveal>
                  );
                })
              ) : (
                <p className={styles.galleryEmpty}>
                  Inga bilder hittades i <code>/public/pic-latest</code>.
                </p>
              )}
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
                <span className={styles.kicker}>Retreat</span>
                <h2 className={styles.sectionTitle}>
                  7 dagar i Gambia – återställ din hormonella balans
                </h2>
                <p className={styles.sectionIntro}>
                  Kundaliniyoga, meditation, sol, hav och närande mat från naturen.
                  Inga förkunskaper krävs – du behöver bara komma som du är.
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
                <span className={styles.kicker}>Om oss</span>
                <h2 className={styles.sectionTitle}>
                  En del av vårt liv som vi öppnar upp och bjuder in dig till
                </h2>
                <p className={styles.sectionIntro}>
                  Gambia är inte bara en destination för oss – det är en del av vår historia.
                  Genom våra lokala rötter och internationella erfarenheter erbjuder vi
                  en resa som är både genuin och trygg.
                </p>
              </Reveal>
            </div>
            <div className={styles.aboutGrid}>
              <Reveal className={styles.aboutCard}>
                <p>
                  Som grundare drivs jag av en djup passion för yoga och meditation.
                  Min bakgrund inom retail har gett mig en stark förståelse för hur man
                  skapar en genomtänkt och emotionell upplevelse. Från val av plats till
                  upplägg, mat och aktiviteter är allt noggrant planerat för att skapa
                  en helhet som känns personlig, varm och minnesvärd.
                </p>
                <ul className={styles.aboutList}>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Lokala rötter</strong>
                      <div>Vi tar dig bortom turiststråken till platser som betyder något för oss.</div>
                    </div>
                  </li>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Egen farm</strong>
                      <div>
                        Frukt och grönsaker plockade direkt från vår farm – mat lagad med omsorg.
                      </div>
                    </div>
                  </li>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Mer än en retreat</strong>
                      <div>Det är en vecka som kan förändra hur du tar hand om dig själv – på riktigt.</div>
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
                <div className={styles.mediaBadge}>Gambia Yoga</div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.section} id="om-ewa">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Om Ewa</span>
                <h2 className={styles.sectionTitle}>
                  Din guide till balans och välmående
                </h2>
              </Reveal>
            </div>
            <div className={styles.aboutGrid}>
              <Reveal className={styles.mediaFrame}>
                <video
                  src="/videos/vid-2.mp4"
                  poster="/images/pic-1.jpeg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={styles.mediaBadge}>Kundalini</div>
              </Reveal>
              <Reveal className={styles.aboutCard}>
                <p>
                  Jag är en svensk yoga-, breathwork- och meditationslärare som har bott i
                  Barcelona i över 20 år. Min resa inom yoga och mindfulness började under
                  tiden jag bodde i Australien – och har varit en naturlig del av mitt liv
                  i mer än två decennier. Sedan 2013 är jag certifierad Kundaliniyogalärare.
                </p>
                <p>
                  I min undervisning väver jag även in inslag av Tai Chi, som på många sätt
                  kompletterar Kundaliniyogans energiarbete och flöde. Min passion är att
                  inspirera och guida människor till ett gladare, mer balanserat och hälsosamt liv
                  – genom yoga, meditation, medveten andning, näring och ett positivt mindset.
                </p>
                <ul className={styles.aboutList}>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Certifierad sedan 2013</strong>
                      <div>Kundaliniyogalärare med djup erfarenhet och passion för undervisning.</div>
                    </div>
                  </li>
                  <li className={styles.aboutItem}>
                    <span className={styles.aboutIcon} />
                    <div>
                      <strong>Holistiskt synsätt</strong>
                      <div>Jag tror på kroppens egen förmåga att hitta balans när vi ger den rätt förutsättningar.</div>
                    </div>
                  </li>
                </ul>
                <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
                  &quot;Make yourself so happy that by looking at you, others become happy too.&quot;
                  <br /><em>– Yogi Bhajan</em>
                </p>
                <p>Namaste, Sat Nam, Love &amp; Light – Ewa</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.section} id="upplevelse">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal>
                <span className={styles.kicker}>Vad du tar med dig hem</span>
                <h2 className={styles.sectionTitle}>
                  En investering i din långsiktiga balans
                </h2>
                <p className={styles.sectionIntro}>
                  Det här är inte bara en resa – du rör dig, andas och äter dig
                  mot en djupare kontakt med din kropp och ett lugn som sitter kvar.
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
                  Är du redo att ge dig själv den pausen?
                </h2>
                <p className={styles.sectionIntro}>
                  Fyll i formuläret så hör vi av oss inom 24 timmar med nästa
                  steg och komplett information om retreaten.
                </p>
              </Reveal>
            </div>
            <Reveal className={styles.contactCard}>
              <div className={styles.contactDetails}>
                <h3>Gambia Yoga Retreat</h3>
                <p>
                  7 dagar av yoga, meditation och näring i Gambia. Vi hjälper
                  dig hitta vägen tillbaka till dig själv.
                </p>
                <ul className={styles.contactList}>
                  <li>E-post: info@gambiayogaretreat.se</li>
                  <li>Telefon: +46 70 123 45 67</li>
                  <li>Instagram: @gambiayogaretreat</li>
                  <li>Namaste, Sat Nam, Love &amp; Light</li>
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
                  <option>Välj retreat</option>
                  <option>7 dagar i Gambia – Hormonell Balans</option>
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
                Gambia <span>Yoga</span> Retreat
              </div>
              <p>
                Kundaliniyoga, meditation och näring i Gambia. En vecka för
                dig som längtar efter balans, återhämtning och stillhet.
              </p>
            </div>
            <div className={styles.footerNav}>
              <a href="#resor">Retreat</a>
              <a href="#om-resan">Om oss</a>
              <a href="#om-ewa">Om Ewa</a>
              <a href="#program">Program</a>
              <a href="#praktisk-info">Praktisk info</a>
              <a href="#kontakt">Kontakt</a>
            </div>
            <div className={styles.footerMeta}>
              (c) 2025 Gambia Yoga Retreat. Alla rättigheter reserverade.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
