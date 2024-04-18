import axios from "axios";
import { toast } from "react-toastify";

export const generateByText = async (query: string, platform: string) => {
  try {
    const res = await axios.post(`/api/by-text`, {
      query,
      platform,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// Generating the topics via the tag
export const generateByTag = async (query: string, platform: string) => {
  try {
    const res = await axios.post(`/api/by-tag`, {
      query,
      platform,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
