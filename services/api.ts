import axios from "axios";
import { toast } from "react-toastify";

const baseURL: any = process.env.BACKEND_URL;

interface registerInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_img: string;
  devto_username: string;
}

interface loginInterface {
  email: string;
  password: string;
}

interface platformIntegrateInterface {
  user_id: string;
  devto: string;
  hashnode: string;
}

// Getting user Profile
export const getProfile = async (session: any) => {
  const res = await axios.post(`${baseURL}/get-profile`, {
    session,
  });
  return res.data;
};

// Getting email of the User
export const getEmail = async (session: any) => {
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

export const changePassword = async (email: string) => {
  const res = await axios.post(`${baseURL}/change-password`, {
    email,
  });
  return res.data;
};

export const updatePassword = async (email: string) => {
  const res = await axios.post(`${baseURL}/change-password`, {
    email,
  });
  return res.data;
};

// Register the User
export const register = async ({
  first_name,
  last_name,
  email,
  password,
  devto_username,
  profile_img,
}: registerInterface) => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await axios.post(`${baseURL}/auth/register`, {
      first_name,
      last_name,
      email,
      timezone,
      password,
      profile_img,
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
export const devtoAnalytics = async (session: any) => {
  console.log(session);
  try {
    const res = await axios.post(`${baseURL}/devto/analytics`, {
      user_id: session?.user?.id,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// Generating the topics via the text
export const generateByText = async (query: string, platform: string) => {
  try {
    const res = await axios.post(`${baseURL}/topic-generation/by-text`, {
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
    const res = await axios.post(`${baseURL}/topic-generation/by-tag`, {
      query,
      platform,
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// Platform integration

export const platformIntegrateDevto = async (
  user_id: string,
  devto: string
) => {
  try {
    const res = await axios.post(`${baseURL}/platform/integrate-devto`, {
      user_id,
      devto,
    });
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const platformIntegrateHashnode = async (
  user_id: string,
  hashnode: string
) => {
  try {
    const res = await axios.post(`${baseURL}/platform/integrate-hashnode`, {
      user_id,
      hashnode,
    });
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const checkIntegration = async (user_id: string) => {
  try {
    const res = await axios.post(`${baseURL}/platform/check-integration`, {
      user_id,
    });
    console.log(res);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateHashnode = async (user_id: string, hashnode: string) => {
  try {
    console.log("user_idh", user_id);
    const res = await axios.post(`${baseURL}/platform/update-hashnode`, {
      user_id,
      hashnode,
    });
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateHashnodePublication = async (
  user_id: string,
  label: any,
  value: any
) => {
  try {
    console.log("user_idh", user_id);
    const res = await axios.post(
      `${baseURL}/platform/update-hashnode-publication`,
      {
        user_id,
        label,
        value,
      }
    );
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateDevtoPublication = async (
  user_id: string,
  label: any,
  value: any
) => {
  try {
    console.log("user_idh", user_id);
    const res = await axios.post(
      `${baseURL}/platform/update-devto-publication`,
      {
        user_id,
        label,
        value,
      }
    );
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateDevto = async (user_id: string, devto: string) => {
  try {
    console.log("user_idh", user_id);
    const res = await axios.post(`${baseURL}/platform/update-devto`, {
      user_id,
      devto,
    });
    console.log(res);
    toast.success(res.data.data);
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

// ARTICLE

export const addArticle = async ({
  user_id,
  devto,
  hashnode,
  devto_data,
  hashnode_data,
  title,
  body_markdown,
  tags_devto,
  tags_hashnode,
  organization_id,
  devto_time,
  hashnode_time,
  publication_id,
}: any) => {
  try {
    const res = await axios.post(`${baseURL}/article/add`, {
      user_id,
      devto,
      hashnode,
      devto_data,
      title,
      tags_devto,
      body_markdown,
      tags_hashnode,
      organization_id,
      publication_id,
      hashnode_data,
      devto_time,
      hashnode_time,
    });
    toast.success("Article Added Successfully");
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const deleteArticle = async (article_id: any) => {
  try {
    const res = await axios.post(`${baseURL}/article/delete`, {
      article_id,
    });
    toast.success("Article Deleted Successfully");
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateDevtoArticle = async ({
  article_id,
  devto,
  devto_data,
  tags_devto,
  body_markdown,
  organization_id,
  devto_time,
  title,
}: any) => {
  try {
    console.log("article", article_id);
    const res = await axios.post(`${baseURL}/article/update-devto`, {
      article_id,
      devto,
      body_markdown,
      tags_devto,
      organization_id,
      devto_time,
      title,
      devto_data,
    });
    toast.success("Article Updated Successfully");
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateHashnodeArticle = async ({
  article_id,
  hashnode,
  hashnode_data,
  tags_hashnode,
  hashnode_time,
  body_markdown,
  publicationId,
  title,
}: any) => {
  try {
    const res = await axios.post(`${baseURL}/article/update-hashnode`, {
      article_id,
      hashnode,
      title,
      tags_hashnode,
      body_markdown,
      hashnode_time,
      publicationId,
      hashnode_data,
    });
    toast.success("Article Updated Successfully");
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
