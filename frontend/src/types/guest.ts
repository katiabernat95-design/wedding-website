export type Attendance = "yes" | "no" | "";
export type MealChoice = "" | "beef" | "pork" | "chicken" | "fish" | "veg";
export type AlcoholChoice =
  | ""
  | "wine"
  | "vodka"
  | "whiskey"
  | "soft"
  | "other";
export type SecondDay = "" | "yes" | "no" | "maybe";

export interface Guest {
  token: string;
  name: string;
  attendance?: Attendance;
  meal_choice?: MealChoice;
  alcohol_choice?: AlcoholChoice;
  alcohol_other?: string;
  second_day?: SecondDay;
  additional_notes?: string;
  rsvp_completed?: string;
  rsvp_last_step?: string;
  drive_folder_url?: string;
  last_updated?: string;
}

export interface RsvpForm {
  attendance: Attendance;
  meal_choice: MealChoice;
  alcohol_choice: AlcoholChoice;
  alcohol_other: string;
  second_day: SecondDay;
  additional_notes: string;
}

export interface DrivePhoto {
  id: string;
  name: string;
  thumbnailLink?: string;
  webViewLink?: string;
  mimeType: string;
}
