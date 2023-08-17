import axios from "axios";
import { toast } from "react-toastify";

const baseURL: any = process.env.BACKEND_URL;

const user_id = "54e7adfb-8130-42cc-95d2-a3652334de44";

export const devtoAnalytics = async () => {
  try {
    const res = await axios.post(`${baseURL}/devto/analytics`, {
      user_id,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const generateByText = async (query: string) => {
  try {
    const res = await axios.post(`${baseURL}/topic-generation/by-text`, {
      query,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const generateByTag = async (query: string) => {
  try {
    const res = await axios.post(`${baseURL}/topic-generation/by-tag`, {
      query,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
