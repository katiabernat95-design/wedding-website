import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button";
import type {
  AlcoholChoice,
  Attendance,
  MealChoice,
  SecondDay,
} from "../../types/guest";

export function StepAttendance({
  value,
  onSelect,
}: {
  value: Attendance;
  onSelect: (v: Attendance) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl mb-1">
        {t("rsvp.attendQuestion")}
      </h2>
      <p className="text-[var(--color-ink-soft)] mb-6">
        {t("rsvp.steps.attend")}
      </p>
      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          selected={value === "yes"}
          onClick={() => onSelect("yes")}
        >
          {t("rsvp.attendYes")}
        </Button>
        <Button
          variant="secondary"
          selected={value === "no"}
          onClick={() => onSelect("no")}
        >
          {t("rsvp.attendNo")}
        </Button>
      </div>
    </div>
  );
}

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  options: { key: T; label: string }[];
  onChange: (v: T) => void;
}

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: OptionGroupProps<T>) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
        {label}
      </div>
      <div className="flex flex-col gap-2">
        {options.map((o) => (
          <Button
            key={o.key}
            variant="secondary"
            selected={value === o.key}
            onClick={() => onChange(o.key)}
          >
            {o.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 text-base rounded-xl bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-sage-500)] transition-colors";

const MEAL_KEYS: MealChoice[] = ["beef", "pork", "chicken", "fish", "veg"];
const ALCOHOL_KEYS: AlcoholChoice[] = [
  "wine",
  "vodka",
  "whiskey",
  "soft",
  "other",
];

export interface MenuValue {
  meal: MealChoice;
  alcohol: AlcoholChoice;
  alcoholOther: string;
}

export function StepMenu({
  value,
  onChange,
}: {
  value: MenuValue;
  onChange: (patch: Partial<MenuValue>) => void;
}) {
  const { t } = useTranslation();
  const mealOptions = MEAL_KEYS.filter((k): k is Exclude<MealChoice, ""> =>
    Boolean(k),
  ).map((k) => ({ key: k, label: t(`rsvp.mealOptions.${k}`) }));
  const alcoholOptions = ALCOHOL_KEYS.filter(
    (k): k is Exclude<AlcoholChoice, ""> => Boolean(k),
  ).map((k) => ({ key: k, label: t(`rsvp.alcoholOptions.${k}`) }));

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-serif text-3xl sm:text-4xl mb-2">
          {t("rsvp.menuTitle")}
        </h2>
        <p className="text-[var(--color-ink-soft)]">{t("rsvp.menuHint")}</p>
      </div>
      <OptionGroup
        label={t("rsvp.mealLabel")}
        value={value.meal}
        options={mealOptions}
        onChange={(v) => onChange({ meal: v })}
      />
      <OptionGroup
        label={t("rsvp.alcoholLabel")}
        value={value.alcohol}
        options={alcoholOptions}
        onChange={(v) => onChange({ alcohol: v })}
      />
      {value.alcohol === "other" && (
        <div>
          <label
            htmlFor="alcohol-other"
            className="block text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2"
          >
            {t("rsvp.alcoholOtherLabel")}
          </label>
          <input
            id="alcohol-other"
            type="text"
            className={inputClass}
            value={value.alcoholOther}
            onChange={(e) => onChange({ alcoholOther: e.target.value })}
            placeholder={t("rsvp.alcoholOtherPlaceholder")}
          />
        </div>
      )}
    </div>
  );
}

export interface LogisticsValue {
  secondDay: SecondDay;
}

export function StepLogistics({
  value,
  onChange,
}: {
  value: LogisticsValue;
  onChange: (patch: Partial<LogisticsValue>) => void;
}) {
  const { t } = useTranslation();
  const secondDayOptions: { key: Exclude<SecondDay, "">; label: string }[] = [
    { key: "yes", label: t("rsvp.secondDayYes") },
    { key: "maybe", label: t("rsvp.secondDayMaybe") },
    { key: "no", label: t("rsvp.secondDayNo") },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-serif text-3xl sm:text-4xl mb-2">
          {t("rsvp.logisticsTitle")}
        </h2>
        <p className="text-[var(--color-ink-soft)]">
          {t("rsvp.secondDayHint")}
        </p>
      </div>
      <OptionGroup
        label={t("rsvp.secondDayLabel")}
        value={value.secondDay}
        options={secondDayOptions}
        onChange={(v) => onChange({ secondDay: v })}
      />
    </div>
  );
}

export function StepNotes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl mb-2">
        {t("rsvp.notesTitle")}
      </h2>
      <p className="text-[var(--color-ink-soft)] mb-5">{t("rsvp.notesHint")}</p>
      <textarea
        className={inputClass + " min-h-[140px] resize-y"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("rsvp.notesPlaceholder")}
      />
    </div>
  );
}
