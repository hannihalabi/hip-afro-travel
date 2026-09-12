import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Boknings- och resevillkor | Hip Afro Travel",
  description:
    "Boknings-, betalnings-, avboknings- och resevillkor för Hip Afro Travels resor till Gambia.",
};

type TermsSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  afterParagraphs?: string[];
  subheading?: string;
  subparagraphs?: string[];
  ordered?: boolean;
};

const sections: TermsSection[] = [
  {
    title: "Om Hipafrotravel",
    paragraphs: [
      "Hipafrotravel är en svensk researrangör som erbjuder tränings-, wellness- och upplevelseresor till Gambia – The Smiling Coast of Africa.",
      "Våra resor kombinerar träning, hälsa, gemenskap, avkoppling och genuina upplevelser av Gambia. Vi erbjuder bland annat boende i vår egen Yogavilla, träning på vår beachbar, måltider, workshops och utflykter.",
      "Dessa villkor gäller för bokning av de resor som arrangeras av Hipafrotravel.",
    ],
  },
  {
    title: "Vad ingår i resan?",
    paragraphs: [
      "Det som ingår i resan framgår alltid av den specifika resebeskrivningen och bokningsbekräftelsen.",
      "För våra träningsresor kan följande ingå:",
    ],
    bullets: [
      "Boende i vår Yogavilla",
      "Frukost och middag",
      "Träningspass enligt reseprogrammet",
      "Yoga och/eller andra träningsformer enligt aktuell resa",
      "Workshops",
      "Utflykter och upplevelser enligt reseprogrammet",
      "Aktiviteter och tjänster som uttryckligen anges som inkluderade",
      "Transfer och andra lokala tjänster som anges i resebeskrivningen",
    ],
    afterParagraphs: [
      "Innehållet kan variera mellan olika resor och grupper.",
      "Tjänster eller aktiviteter som inte uttryckligen anges som inkluderade i resebeskrivningen ingår inte i resans pris.",
    ],
  },
  {
    title: "Resans pris",
    paragraphs: [
      "Priset för den aktuella träningsresan är 17 000 SEK per person.",
      "Priset gäller enligt den resebeskrivning och det program som presenteras vid bokningstillfället.",
    ],
    subheading: "Flyg ingår inte",
    subparagraphs: [
      "Flygresa till och från Gambia ingår inte i Hipafrotravels resepris. Flygbiljetten bokas och betalas separat av resenären.",
      "Hipafrotravel kan informera om rekommenderade flygavgångar och, när möjlighet finns, hjälpa till att samordna gruppbokningar. När resenären själv köper sin flygbiljett ansvarar resenären för flygbiljettens villkor.",
      "Resenären ansvarar även för att boka flyg som passar de tider som anges för resan.",
    ],
  },
  {
    title: "Bokning",
    paragraphs: [
      "Bokning sker via Hipafrotravels bokningssystem eller på annat sätt som Hipafrotravel anvisar.",
      "När bokningen genomförs ska kunden ta del av reseinformationen och dessa villkor.",
      "Bokningen blir bindande när kunden har genomfört betalningen och Hipafrotravel har bekräftat bokningen.",
      "Genom att genomföra bokningen bekräftar kunden att den har tagit del av och accepterar dessa villkor.",
    ],
  },
  {
    title: "Betalning",
    paragraphs: [
      "Hela resans pris, 17 000 SEK per person, betalas vid bokningstillfället.",
      "Betalningen sker via det betalningsalternativ som anges vid bokningen.",
      "När betalningen är genomförd och bokningen har bekräftats är kundens plats reserverad.",
      "Flygbiljetten betalas separat och ingår inte i denna betalning.",
    ],
  },
  {
    title: "Minimiantal för resans genomförande",
    paragraphs: [
      "För att resan ska genomföras krävs minst 8 betalande deltagare. Detta minimiantal gäller för den aktuella resan och anges i bokningsinformationen.",
      "Hipafrotravel kommer att meddela bokade resenärer senast 90 dagar före resans avresa om resan är bekräftad.",
      "Om minst 8 deltagare har bokat och betalat resan vid denna tidpunkt bekräftas resan.",
      "Om minimiantalet inte har uppnåtts kan Hipafrotravel ställa in resan enligt gällande lagstiftning och dessa villkor.",
      "Om resan ställs in på grund av att minimiantalet inte uppnåtts återbetalas det belopp kunden har betalat till Hipafrotravel enligt gällande regler.",
    ],
  },
  {
    title: "Om Hipafrotravel ställer in resan",
    paragraphs: [
      "Om Hipafrotravel behöver ställa in resan på grund av att minimiantalet deltagare inte uppnåtts informeras resenären så snart som möjligt.",
      "Resenären får då återbetalning av det belopp som betalats till Hipafrotravel för den aktuella resan, enligt gällande lagstiftning.",
      "En inställd resa på grund av för få deltagare betraktas inte som en avbokning från resenärens sida.",
      "Observera att flygbiljetter bokas och betalas separat. Hipafrotravel ansvarar därför inte för kostnader eller återbetalning av en flygbiljett som resenären själv har köpt. Resenären bör därför överväga att boka en flexibel eller återbetalningsbar flygbiljett och/eller teckna ett lämpligt avbeställningsskydd.",
    ],
  },
  {
    title: "Avbokning från resenären",
    paragraphs: [
      "Om resenären själv vill avboka sin resa ska detta meddelas Hipafrotravel skriftligen så snart som möjligt.",
      "Vid avbokning gäller de avbokningsvillkor som anges för den aktuella resan och som kunden fått ta del av före bokningen.",
      "Eventuell återbetalning beräknas utifrån när avbokningen görs och vilka kostnader Hipafrotravel har haft eller är skyldig att betala med anledning av bokningen.",
      "Om resenären har rätt till återbetalning sker denna enligt gällande lagstiftning och de villkor som gäller för den aktuella resan.",
    ],
  },
  {
    title: "Avbeställning på grund av oundvikliga och extraordinära omständigheter",
    paragraphs: [
      "Resenären kan under vissa förutsättningar ha rätt att avbeställa resan utan avbeställningsavgift om det förekommer oundvikliga och extraordinära omständigheter på resmålet eller i dess omedelbara närhet som väsentligen påverkar genomförandet av resan eller transporten till resmålet.",
      "Bedömningen görs utifrån omständigheterna i det enskilda fallet och gällande lagstiftning.",
    ],
  },
  {
    title: "Sjukdom",
    paragraphs: [
      "Om resenären blir sjuk och inte kan delta i resan gäller de avbokningsvillkor som gäller för bokningen, om inte resenären har rätt till kostnadsfri avbeställning enligt lag.",
      "Hipafrotravel rekommenderar starkt att resenären tecknar en reseförsäkring med avbeställningsskydd som omfattar sjukdom och andra oförutsedda händelser.",
    ],
  },
  {
    title: "Reseförsäkring",
    paragraphs: [
      "Resenären ansvarar själv för att ha ett tillräckligt försäkringsskydd under resan.",
      "Hipafrotravel rekommenderar en reseförsäkring som omfattar exempelvis:",
    ],
    bullets: [
      "Sjukdom och olycksfall",
      "Vårdkostnader",
      "Hemtransport",
      "Avbokning",
      "Bagage",
      "Förseningar",
      "Andra oförutsedda händelser",
    ],
    afterParagraphs: [
      "Resenären ansvarar för att kontrollera försäkringens omfattning och villkor.",
    ],
  },
  {
    title: "Pass, visum och inresebestämmelser",
    paragraphs: [
      "Resenären ansvarar själv för att ha ett giltigt pass och de resehandlingar som krävs för resan.",
      "Resenären ansvarar även för att kontrollera aktuella regler för inresa till Gambia, inklusive eventuella visum-, vaccinations- eller hälsokrav.",
      "Hipafrotravel kan lämna generell reseinformation men kan inte garantera att en resenär får resa in i landet.",
    ],
  },
  {
    title: "Ändringar i reseprogrammet",
    paragraphs: [
      "Hipafrotravel strävar efter att genomföra resan enligt det program som presenterats vid bokningen.",
      "Av praktiska, vädermässiga, säkerhetsmässiga eller andra skäl kan det ibland vara nödvändigt att ändra ordningen på aktiviteter eller göra mindre förändringar i programmet.",
      "Om en aktivitet behöver flyttas kan Hipafrotravel ersätta eller anpassa aktiviteten på ett sätt som i möjligaste mån motsvarar det ursprungliga innehållet.",
      "Om en väsentlig ändring av resan görs gäller resenärens rättigheter enligt tillämplig lagstiftning.",
    ],
  },
  {
    title: "Träning och deltagande i aktiviteter",
    paragraphs: [
      "Resans träningspass och aktiviteter är utformade för den målgrupp som anges i resebeskrivningen.",
      "Resenären ansvarar själv för att bedöma om den egna fysiska förmågan är lämplig för respektive aktivitet.",
      "Resenären ska följa instruktioner från instruktörer och Hipafrotravels personal.",
      "Om en resenär har en skada, sjukdom eller annan omständighet som kan påverka deltagandet rekommenderas resenären att rådgöra med läkare före resan.",
    ],
  },
  {
    title: "Boende",
    paragraphs: [
      "Boendet sker enligt den boendeform som anges i resebeskrivningen.",
      "Hipafrotravels Yogavilla är ett intimt boende med lokal prägel där gästerna får möjlighet att uppleva Gambia på nära håll.",
      "Boendet kan innebära att resenärer delar gemensamma utrymmen med andra deltagare.",
      "Resenären ska visa hänsyn till övriga gäster, personal och boendets regler.",
    ],
  },
  {
    title: "Måltider",
    paragraphs: [
      "Måltider som ingår i resan framgår av resebeskrivningen.",
      "Hipafrotravel erbjuder i första hand lokal och gambisk mat baserad på färska råvaror.",
      "Resenären ansvarar för att före bokning informera Hipafrotravel om relevanta allergier eller särskilda kostbehov.",
      "Hipafrotravel gör sitt bästa för att tillgodose sådana önskemål men kan inte garantera att alla kostönskemål kan tillgodoses.",
    ],
  },
  {
    title: "Resenärens ansvar under resan",
    paragraphs: ["Resenären ansvarar för att:"],
    bullets: [
      "Följa instruktioner från Hipafrotravels personal och instruktörer",
      "Visa hänsyn till andra resenärer och lokalbefolkningen",
      "Följa lokala lagar och regler",
      "Ta ansvar för sina personliga tillhörigheter",
      "Följa regler för boendet och de aktiviteter som ingår i resan",
    ],
    afterParagraphs: [
      "Om en resenär allvarligt stör andra gäster, personal eller aktiviteter kan Hipafrotravel vidta åtgärder enligt gällande lag och resevillkor.",
    ],
  },
  {
    title: "Personliga kostnader",
    paragraphs: [
      "Personliga utgifter ingår inte i resans pris om de inte uttryckligen anges som inkluderade. Det kan exempelvis vara:",
    ],
    bullets: [
      "Alkoholhaltiga drycker",
      "Privata inköp",
      "Extra aktiviteter",
      "Personliga behandlingar",
      "Souvenirer",
      "Kostnader kopplade till flygresan",
      "Andra privata utgifter",
    ],
  },
  {
    title: "Reklamation under resan",
    paragraphs: [
      "Om resenären upplever att en tjänst inte genomförs enligt avtalet ska detta meddelas Hipafrotravel så snart som möjligt under resan.",
      "Hipafrotravel ska ges möjlighet att försöka åtgärda problemet.",
      "Reklamation kan lämnas till info@hipafrotravel.com.",
    ],
  },
  {
    title: "Överlåtelse av resa",
    paragraphs: [
      "Under vissa förutsättningar kan resenären ha rätt att överlåta sin bokning till en annan person.",
      "Överlåtelsen ska meddelas Hipafrotravel inom skälig tid före avresa.",
      "Den nya resenären måste uppfylla de krav som gäller för resan.",
      "Eventuella faktiska och skäliga kostnader som uppstår på grund av överlåtelsen kan debiteras enligt gällande regler.",
    ],
  },
  {
    title: "Resegaranti",
    paragraphs: [
      "Hipafrotravel följer de regler som gäller för resegaranti för researrangörer.",
      "Information om resegarantin och resenärens rättigheter lämnas i samband med bokningen i enlighet med gällande lagstiftning.",
    ],
  },
  {
    title: "Personuppgifter",
    paragraphs: [
      "Hipafrotravel behandlar personuppgifter som är nödvändiga för att administrera bokningen och genomföra resan.",
      "Personuppgifter behandlas enligt gällande dataskyddslagstiftning och Hipafrotravels integritetspolicy.",
    ],
  },
  {
    title: "Information före bokning",
    paragraphs: [
      "Innan bokningen genomförs ska resenären få tillgång till information om bland annat:",
    ],
    bullets: [
      "Resans innehåll",
      "Pris",
      "Vad som ingår",
      "Vad som inte ingår",
      "Betalningsvillkor",
      "Minimiantal deltagare",
      "Datum för besked om resans genomförande",
      "Flyg som separat kostnad",
      "Avbokningsvillkor",
      "Reseförsäkring",
      "Resehandlingar och inresekrav",
      "Resegaranti",
      "Övriga villkor som gäller för resan",
    ],
  },
  {
    title: "Godkännande",
    paragraphs: ["Genom att boka och betala resan bekräftar resenären att:"],
    bullets: [
      "Resenären har tagit del av reseinformationen",
      "Resenären har tagit del av dessa boknings-, betalnings-, avboknings- och resevillkor",
      "Resenären förstår att flyg inte ingår i priset och bokas separat",
      "Resenären är införstådd med att resan kräver minst 8 deltagare",
      "Resenären är införstådd med att Hipafrotravel senast 90 dagar före avresa meddelar om resan är bekräftad",
      "Resenären accepterar de villkor som gäller för den bokade resan",
    ],
    ordered: true,
  },
];

export default function TravelTermsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href="/">
            Hip Afro <span>Travel</span>
          </Link>
          <Link className={styles.backLink} href="/">
            <span aria-hidden="true">←</span> Till startsidan
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Viktigt före bokning</p>
            <h1>Boknings-, betalnings-, avboknings- och resevillkor</h1>
            <p className={styles.lead}>
              Villkor för Hipafrotravels tränings-, wellness- och
              upplevelseresor till Gambia.
            </p>
            <p className={styles.updated}>Senast uppdaterad: 10 augusti 2026</p>
          </div>
        </section>

        <article className={styles.content}>
          <div className={styles.notice}>
            <strong>Läs villkoren före bokning.</strong>
            <span>
              Genom att boka och betala bekräftar du att du har tagit del av
              och accepterar villkoren nedan.
            </span>
          </div>

          <div className={styles.sections}>
            {sections.map((section, index) => {
              const List = section.ordered ? "ol" : "ul";

              return (
                <section className={styles.termSection} key={section.title}>
                  <span className={styles.sectionNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h2>
                      {index + 1}. {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.subheading ? <h3>{section.subheading}</h3> : null}
                    {section.subparagraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <List>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </List>
                    ) : null}
                    {section.afterParagraphs?.map((paragraph) => (
                      <p className={styles.afterList} key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className={styles.contact}>
            <strong>Hipafrotravel</strong>
            <a href="mailto:info@hipafrotravel.com">info@hipafrotravel.com</a>
            <a href="https://www.hipafrotravel.com">www.hipafrotravel.com</a>
          </div>
        </article>
      </main>
    </div>
  );
}
