import { fetchMatchMaking } from "../../helper/apiHelper";
import {
  MatchingRequest,
  MatchingResponse,
  NakshatraRequest,
} from "../../types/matchingTypes";
import DotenvFlow from "dotenv-flow";
DotenvFlow.config();

const api_URl = process.env.API_URL;
const api_Key = process.env.API_KEY;
const API_NAKSHATRA_URL = process.env.API_NAKSHATRA_URL;
const API_AGGREGATE_URL = process.env.API_AGGREGATE_URL;

// north match making

export const getMatchingData = async (
  request: MatchingRequest
): Promise<MatchingResponse> => {
  const {
    boy_dob,
    boy_tob,
    boy_tz,
    boy_lat,
    boy_lon,
    girl_dob,
    girl_tob,
    girl_tz,
    girl_lat,
    girl_lon,
    lang,
  } = request;

  try {
    // Construct URL using URL and URLSearchParams
    const url = new URL(api_URl || "");
    url.search = new URLSearchParams({
      boy_dob,
      boy_tob,
      boy_tz: boy_tz.toString(),
      boy_lat: boy_lat.toString(),
      boy_lon: boy_lon.toString(),
      girl_dob,
      girl_tob,
      girl_tz: girl_tz.toString(),
      girl_lat: girl_lat.toString(),
      girl_lon: girl_lon.toString(),
      api_key: api_Key || "",
      lang,
    }).toString();

    const data = await fetchMatchMaking(url.toString());
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching match-making data:", error.message); // Debugging
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

// Aggregate  match making

export const AggregateMatchingService = async (
  request: MatchingRequest
): Promise<MatchingResponse> => {
  const {
    boy_dob,
    boy_tob,
    boy_tz,
    boy_lat,
    boy_lon,
    girl_dob,
    girl_tob,
    girl_tz,
    girl_lat,
    girl_lon,
    lang,
  } = request;

  try {
    // Construct URL using URL and URLSearchParams
    const url = new URL(API_AGGREGATE_URL || "");
    url.search = new URLSearchParams({
      boy_dob,
      boy_tob,
      boy_tz: boy_tz.toString(),
      boy_lat: boy_lat.toString(),
      boy_lon: boy_lon.toString(),
      girl_dob,
      girl_tob,
      girl_tz: girl_tz.toString(),
      girl_lat: girl_lat.toString(),
      girl_lon: girl_lon.toString(),
      api_key: api_Key || "",
      lang,
    }).toString();

    const data = await fetchMatchMaking(url.toString());
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching match-making data:", error.message); // Debugging
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

// Nakashtra match making

export const NakashtraMatchingService = async (
  request: NakshatraRequest
): Promise<MatchingResponse> => {
  const {
    boy_star,
    girl_star,

    lang,
  } = request;

  try {
    // Construct URL using URL and URLSearchParams
    const url = new URL(API_NAKSHATRA_URL || "");
    url.search = new URLSearchParams({
        boy_star: boy_star.toString(), // Convert to string
        girl_star: girl_star.toString(), // Convert to string
        api_key: api_Key || "",
        lang,
    }).toString();

    const data = await fetchMatchMaking(url.toString());
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching match-making data:", error.message); // Debugging
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
