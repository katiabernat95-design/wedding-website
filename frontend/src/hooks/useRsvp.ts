import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { saveRsvp, type RsvpExtras } from "../api/guests";
import { useGuest } from "../context/GuestContext";
import type {
  AlcoholChoice,
  Attendance,
  Guest,
  MealChoice,
  RsvpForm,
  SecondDay,
} from "../types/guest";

export type SaveStatus = "idle" | "saving" | "success" | "error";

export const emptyRsvpForm: RsvpForm = {
  attendance: "",
  meal_choice: "",
  alcohol_choice: "",
  alcohol_other: "",
  second_day: "",
  additional_notes: "",
};

export function guestToForm(guest: Guest | null): RsvpForm {
  if (!guest) return { ...emptyRsvpForm };
  return {
    attendance: (guest.attendance as Attendance) ?? "",
    meal_choice: (guest.meal_choice as MealChoice) ?? "",
    alcohol_choice: (guest.alcohol_choice as AlcoholChoice) ?? "",
    alcohol_other: guest.alcohol_other ?? "",
    second_day: (guest.second_day as SecondDay) ?? "",
    additional_notes: guest.additional_notes ?? "",
  };
}

export function useRsvp() {
  const { guest, token, setGuest } = useGuest();
  const [form, setForm] = useState<RsvpForm>(() => guestToForm(guest));
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!guest) return;
    setForm(guestToForm(guest));
  }, [guest]);

  const setField = useCallback(
    <K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      if (status === "success") setStatus("idle");
    },
    [status],
  );

  const reset = useCallback(() => {
    setForm(guestToForm(guest));
    setStatus("idle");
    setErrorMessage(null);
  }, [guest]);

  const save = useCallback(
    async (extras: RsvpExtras = {}): Promise<boolean> => {
      if (!token) return false;
      setStatus("saving");
      setErrorMessage(null);
      const payload: RsvpForm =
        form.attendance === "no"
          ? { ...emptyRsvpForm, attendance: "no" }
          : form;
      try {
        await saveRsvp(token, payload, extras);
        if (guest) setGuest({ ...guest, ...payload, ...extras });
        if (form.attendance === "no") setForm(payload);
        setStatus("success");
        return true;
      } catch (e) {
        setStatus("error");
        const message =
          axios.isAxiosError(e) && e.response?.data?.error
            ? String(e.response.data.error)
            : e instanceof Error
              ? e.message
              : "Failed to save RSVP";
        setErrorMessage(message);
        return false;
      }
    },
    [token, form, guest, setGuest],
  );

  return { form, setField, setForm, reset, save, status, errorMessage };
}
