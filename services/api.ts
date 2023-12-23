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

interface platformIntegrateInterface{
  user_id: string
  devto: string
  hashnode: string
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

// Platform integration

export const platformIntegrate = async (user_id : string, devto :string, hashnode: string) => {
  try {
    const res = await axios.post(`${baseURL}/platform/integrate`, {
      user_id,
      devto,
      hashnode
    });
    console.log(res)
    toast.success(res.data.data)
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const checkIntegration = async (user_id : string) => {
  try {
    const res = await axios.post(`${baseURL}/platform/check-integration`, {
      user_id,
    });
    console.log(res)
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateHashnode = async (user_id : string, hashnode: string) => {
  try {
    console.log("user_idh", user_id)
    const res = await axios.post(`${baseURL}/platform/update-hashnode`, {
      user_id,
      hashnode
    });
    console.log(res)
    toast.success(res.data.data)
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateDevto = async (user_id : string, devto: string) => {
  try {
    console.log("user_idh", user_id)
    const res = await axios.post(`${baseURL}/platform/update-devto`, {
      user_id,
      devto
    });
    console.log(res)
    toast.success(res.data.data)
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
