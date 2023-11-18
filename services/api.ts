import axios from "axios";
import { toast } from "react-toastify";

const baseURL: any = process.env.BACKEND_URL;

interface registerInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  devto_username: string;
}

interface loginInterface {
  email: string;
  password: string;
}

// Getting user Profile
export const getProfile = async (session : any) => {
  const res = await axios.post(`${baseURL}/get-profile`, {
    session,
  });
  return res.data;
};


// Getting email of the User
export const getEmail = async (session : any) => {
  const res = await axios.post(`${baseURL}/get-email`, {
    session,
  });
  console.log(res);
  return res.data;
};

// Updating the profile
export const updateProfile = async (values: any) => {
  const res = await axios.post(`${baseURL}/update-profile`, values);

  return res.data;
};

// Register the User
export const register = async ({
  first_name,
  last_name,
  email,
  password,
  devto_username,
}: registerInterface) => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await axios.post(`${baseURL}/auth/register`, {
      first_name,
      last_name,
      email,
      timezone,
      password,
      devto_username,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// Login the user
export const login = async ({ email, password }: loginInterface) => {
  try {
    const res = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// devto Analytics data
export const devtoAnalytics = async (session : any) => {
  console.log(session)
  try {
    const res = await axios.post(`${baseURL}/devto/analytics`, {
      user_id:session?.user?.id,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// Generating the topics via the text
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

// Generating the topics via the tag
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
