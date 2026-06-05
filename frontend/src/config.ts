import vibeImage from "./assets/vibe.jpg";
import registrationImage from "./assets/registration.jpg";
import proposalImage from "./assets/proposal.jpg";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000/api";

export const wedding = {
  bride: "Ekaterina",
  groom: "Sergey",
  date: new Date("2026-08-13T13:00:00"),
  endDate: new Date("2026-08-15T12:00:00"),
  venueName: 'Парк-отель "Лесная Гавань"',
  venueAddress: 'ур. Сосновый бор, Брестская область, Беларусь',
  // Google Maps embed URL (used in iframe).
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.8184782581734!2d24.146665477567996!3d52.19217216044805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47211ecd8cb50905%3A0xd6352e8686258c10!2z0JvQtdGB0L3QsNGPINCT0LDQstCw0L3RjCDQn9Cw0YDQui3QvtGC0LXQu9GM!5e0!3m2!1sru!2spl!4v1780675255623!5m2!1sru!2spl",
  // Public Google Maps link (used in "Get directions" button).
  googleMapsUrl: "https://maps.app.goo.gl/Zdig1NRmJFXp7yq37",
} as const;

export const images = {
  vibe: vibeImage,
  registration: registrationImage,
  proposal: proposalImage,
} as const;

