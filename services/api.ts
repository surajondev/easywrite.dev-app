import axios from "axios";
import { toast } from "react-toastify";

const baseURL: string = process.env.BACKEND_URL || "";

const user_id = "54e7adfb-8130-42cc-95d2-a3652334de44";

export const devtoAnalytics = async () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await axios.post(`${baseURL}/devto/analytics`, {
      user_id,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
