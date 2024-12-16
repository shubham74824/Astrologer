import Axios from "axios";
import DotenvFlow from "dotenv-flow";

DotenvFlow.config();
const fast2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";
export const sendSMS = async (phone: string, message: string) => {
  const apiKey = process.env.FAST2SMS_API_KEY;

  if (!apiKey) {
    throw new Error("fast2sms API Key not found ");
  }

  const data = {
    route: "v3",
    sender_id: "TXTIND",
    message,
    language: "english",
    numbers: phone,
  };
  try {
    const response = await Axios.post(fast2SMS_URL, data, {
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending sms:", error);
  }
};
