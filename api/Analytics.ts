import axios from "axios";
import { toast } from "react-toastify";

export const devtoAnalytics = async (session: any) => {
  console.log(session);
  try {
    const res = await axios.post(`/api/devto-analytics`, {
      user_id: session?.user?.id,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
  }
};
