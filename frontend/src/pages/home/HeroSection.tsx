import { useTranslation } from "react-i18next";
import { useGuest } from "../../context/GuestContext";
import { wedding, images } from "../../config";
import { StatusBadge, attendanceToStatus } from "../../components/StatusBadge";
import type { Attendance } from "../../types/guest";
import { Button } from "../../components/Button.tsx";
import { useNavigate } from "react-router-dom";

function dateLabel(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function HeroSection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { guest } = useGuest();
  const status = attendanceToStatus(
    guest?.attendance as Attendance | undefined,
  );

  return (
    <section className="text-center">
      <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)]">
        {t("home.eyebrow")}
      </div>
      <h1 className="mt-6 font-serif text-6xl sm:text-7xl leading-[1.05]">
        {wedding.groom}
        <span className="font-script text-[var(--color-sage-600)] block text-7xl sm:text-8xl my-1">
          {t("home.coupleAnd")}
        </span>
        {wedding.bride}
      </h1>
      <div className="mt-6 text-sm sm:text-base tracking-[0.2em] uppercase text-[var(--color-ink-soft)]">
        {dateLabel(wedding.date, i18n.resolvedLanguage ?? "ru")}
      </div>
      <div className="text-sm sm:text-base tracking-[0.2em] uppercase text-[var(--color-ink-soft)]">
        -
      </div>
      <div className="text-sm sm:text-base tracking-[0.2em] uppercase text-[var(--color-ink-soft)]">
        {dateLabel(wedding.endDate, i18n.resolvedLanguage ?? "ru")}
      </div>
      <div className="mt-1 text-sm text-[var(--color-muted)]">
        {wedding.venueName}
      </div>

      <div className="mt-8 mx-auto max-w-md aspect-[4/5] sm:aspect-[3/2] sm:max-w-xl rounded-2xl overflow-hidden border border-[var(--color-line)]">
        <img
          src={images.vibe}
          alt={`${wedding.bride} & ${wedding.groom}`}
          className="w-full h-full object-cover"
        />
      </div>

      {guest && (
        <div className="mt-8 inline-flex flex-col items-center gap-3">
          <div className="text-[var(--color-ink-soft)]">
            {t("home.welcome", { name: guest.name })}
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]">
            {t("home.yourStatus")}:
            <StatusBadge status={status} />
          </div>
          {status === "pending" && (
            <div>
              <Button onClick={() => navigate("rsvp")}>
                {t("home.rsvpButton")}
              </Button>
            </div>
          )}
          <p className="text-sm text-[var(--color-muted)]">
            {t("home.welcomeBody")}
          </p>
        </div>
      )}
    </section>
  );
}
