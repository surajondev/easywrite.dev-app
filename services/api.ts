import axios from "axios";
import { toast } from "react-toastify";

const baseURL: string = process.env.BACKEND_URL || "";

export const join = async (email: string) => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await axios.post(`${baseURL}/join`, {
      email,
      timezone,
    });
    toast.success(res.data.data);
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
