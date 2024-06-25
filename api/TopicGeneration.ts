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

export const pdfAnswer = async (query: string) => {
  try {
    const res = await axios.post(`/api/pdf`, {
      query,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const addData = async (src: any) => {
  try {
    const res = await axios.post(`/api/add-data`, {
      src,
    });
    toast.success("Data Added Successfully");
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.error);
  }
  // response.status(200).send("Data Added Successfully!");
};
