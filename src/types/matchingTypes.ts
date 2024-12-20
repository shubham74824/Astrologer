export interface MatchingRequest {
  boy_dob: string;
  boy_tob: string;
  boy_tz: number;
  boy_lat: number;
  boy_lon: number;
  girl_dob: string;
  girl_tob: string;
  girl_tz: number;
  girl_lat: number;
  girl_lon: number;
  lang: "en" | "hi";
}

// Nakshatra Match type

export interface NakshatraRequest {
  boy_star: number;
  girl_star: number;
  lang: "en" | "hi";
}
export interface MatchingResponse {
  success: boolean;
  data?: any;
  error?: string;
}
