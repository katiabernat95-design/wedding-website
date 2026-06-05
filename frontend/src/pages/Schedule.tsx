import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { ScheduleItem } from "../components/ScheduleItem";
import type { ScheduleEntry } from "../components/ScheduleItem";
import { Button } from "../components/Button";
import { downloadIcs } from "../utils/calendar";

export function Schedule() {
  const { t } = useTranslation();
  const items = t("schedule.items", { returnObjects: true }) as ScheduleEntry[];

  return (
    <div>
      <PageHeader
        eyebrow={t("home.eyebrow")}
        title={t("schedule.title")}
      />

      <div className="max-w-xl mx-auto">
        {items.map((entry, i) => (
          <ScheduleItem key={`${entry.time}-${i}`} entry={entry} />
        ))}
      </div>

      <div className="mt-10 max-w-sm mx-auto">
        <Button onClick={downloadIcs}>🗓 {t("common.addToCalendar")}</Button>
      </div>
    </div>
  );
}
