"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@/app/page.module.css";

export type CalendarTrip = {
  id: string;
  category: "yoga" | "training";
  title: string;
  host: string;
  hostIcon: string;
  dates: string;
  startDate: string;
  endDate: string;
  price: string;
};

type CalendarContextValue = {
  openCalendar: () => void;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

const WEEKDAYS = ["M", "T", "O", "T", "F", "L", "S"];
const MONTHS = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function CalendarMonth({
  year,
  month,
  trips,
  onSelect,
}: {
  year: number;
  month: number;
  trips: CalendarTrip[];
  onSelect: (tripId: string) => void;
}) {
  const numberOfDays = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const firstWeekday =
    (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: numberOfDays }, (_, index) => index + 1),
  ];

  return (
    <article className={styles.calendarMonthCard}>
      <header className={styles.calendarMonthHeader}>
        <div>
          <span>{year}</span>
          <h3>{MONTHS[month]}</h3>
        </div>
        <span className={styles.calendarTripCount}>
          {trips.length} {trips.length === 1 ? "resa" : "resor"}
        </span>
      </header>

      <div
        className={styles.calendarGrid}
        aria-label={`${MONTHS[month]} ${year}`}
      >
        {WEEKDAYS.map((weekday, index) => (
          <span className={styles.calendarWeekday} key={`${weekday}-${index}`}>
            {weekday}
          </span>
        ))}
        {cells.map((day, index) => {
          if (day === null) {
            return <span className={styles.calendarEmptyDay} key={`empty-${index}`} />;
          }

          const date = isoDate(year, month, day);
          const activeTrips = trips.filter(
            (trip) => date >= trip.startDate && date <= trip.endDate
          );
          const hasYoga = activeTrips.some((trip) => trip.category === "yoga");
          const hasTraining = activeTrips.some(
            (trip) => trip.category === "training"
          );

          return (
            <span
              className={styles.calendarDay}
              data-active={activeTrips.length > 0 ? "true" : "false"}
              data-yoga={hasYoga ? "true" : "false"}
              data-training={hasTraining ? "true" : "false"}
              key={date}
              aria-label={
                activeTrips.length
                  ? `${day} ${MONTHS[month]}: ${activeTrips
                      .map((trip) => trip.title)
                      .join(" och ")}`
                  : undefined
              }
            >
              {day}
              {activeTrips.length ? (
                <span className={styles.calendarDayMarkers} aria-hidden="true">
                  {hasYoga ? <i data-tone="yoga" /> : null}
                  {hasTraining ? <i data-tone="training" /> : null}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>

      <div className={styles.calendarTripList}>
        {trips.map((trip) => (
          <button
            type="button"
            className={styles.calendarTripOption}
            data-tone={trip.category}
            onClick={() => onSelect(trip.id)}
            key={trip.id}
          >
            <span className={styles.calendarTripIcon} aria-hidden="true">
              {trip.hostIcon}
            </span>
            <span className={styles.calendarTripCopy}>
              <small>
                {trip.dates} · Med {trip.host}
              </small>
              <strong>{trip.title}</strong>
              <span>Från {trip.price} · del i dubbelrum</span>
            </span>
            <span className={styles.calendarTripAction}>
              Visa & boka
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 10h13m0 0-5-5m5 5-5 5" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

export function TripCalendarProvider({
  trips,
  children,
}: {
  trips: CalendarTrip[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const groupedYears = useMemo(() => {
    const monthMap = new Map<string, CalendarTrip[]>();

    trips.forEach((trip) => {
      const key = trip.startDate.slice(0, 7);
      monthMap.set(key, [...(monthMap.get(key) ?? []), trip]);
    });

    const yearMap = new Map<
      number,
      Array<{ month: number; trips: CalendarTrip[] }>
    >();

    [...monthMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, monthTrips]) => {
        const [year, month] = key.split("-").map(Number);
        yearMap.set(year, [
          ...(yearMap.get(year) ?? []),
          { month: month - 1, trips: monthTrips },
        ]);
      });

    return [...yearMap.entries()].map(([year, months]) => ({ year, months }));
  }, [trips]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) dialog.close();
  }, [open]);

  const selectTrip = (tripId: string) => {
    setOpen(false);

    window.setTimeout(() => {
      const card = document.getElementById(`resa-${tripId}`);
      if (!card) return;

      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.dataset.calendarHighlight = "true";
      window.setTimeout(() => {
        delete card.dataset.calendarHighlight;
      }, 1800);
    }, 180);
  };

  return (
    <CalendarContext.Provider value={{ openCalendar: () => setOpen(true) }}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.tripCalendarDialog}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        aria-labelledby="trip-calendar-title"
        aria-describedby="trip-calendar-description"
      >
        <div className={styles.tripCalendarPanel}>
          <header className={styles.tripCalendarTopbar}>
            <div className={styles.tripCalendarBrand}>
              <span className={styles.liveDotDark} aria-hidden="true" />
              Bokningen är öppen
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.tripCalendarClose}
              onClick={() => setOpen(false)}
              aria-label="Stäng resekalendern"
            >
              <span aria-hidden="true" />
            </button>
          </header>

          <div className={styles.tripCalendarIntro}>
            <p className={styles.kicker}>Resekalender</p>
            <h2 id="trip-calendar-title">När vill du resa?</h2>
            <p id="trip-calendar-description">
              Två noga utvalda veckor i Gambia. Jämför datumen och välj den
              vecka som passar dig bäst.
            </p>
            <div className={styles.calendarLegend} aria-label="Färgförklaring">
              <span data-tone="yoga">
                <i aria-hidden="true" /> Yoga med Ewa
              </span>
              <span data-tone="training">
                <i aria-hidden="true" /> Träning med Delta
              </span>
            </div>
          </div>

          <div className={styles.tripCalendarYears}>
            {groupedYears.map(({ year, months }) => (
              <section className={styles.calendarYear} key={year}>
                <h2>{year}</h2>
                <div className={styles.calendarMonths}>
                  {months.map(({ month, trips: monthTrips }) => (
                    <CalendarMonth
                      year={year}
                      month={month}
                      trips={monthTrips}
                      onSelect={selectTrip}
                      key={`${year}-${month}`}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <footer className={styles.tripCalendarFooter}>
            <span aria-hidden="true">✓</span>
            <p>
              <strong>Mycket ingår redan.</strong> Boende, mat, transfer och
              utflykter ingår – du bokar bara flyget separat.
            </p>
          </footer>
        </div>
      </dialog>
    </CalendarContext.Provider>
  );
}

export function TripCalendarTrigger({
  className,
  children,
  onOpen,
}: {
  className?: string;
  children: ReactNode;
  onOpen?: () => void;
}) {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("TripCalendarTrigger måste ligga i TripCalendarProvider");
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        context.openCalendar();
      }}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}
