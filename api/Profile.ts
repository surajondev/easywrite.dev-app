import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";

export const getProfile = async (session: any) => {
  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, profile_img, email")
    .eq("user_id", session.user.id);

  if (error) {
    console.log(error);
    toast.error(error.message);
  }
  console.log(data);
  return data;
};

export const updateProfile = async (values: any) => {
  const session = values.session;

  const user: any = {
    first_name: values.first_name,
    last_name: values.last_name,
    profile_img: values.profile_img,
  };

  const { error } = await supabase
    .from("users")
    .update(user)
    .eq("user_id", session.user.id);

  if (error) {
    console.log(error);
    toast.error(error.message);
  }
  return { data: "User Updated" };
};

export const changePassword = async (email: string) => {
  console.log(email, process.env.CLIENT_URL);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/update-password`,
  });

  if (error) {
    console.log(error);
    toast.error(error.message);
  }

  return { data: "Password reset email is sent" };
};

export const changeEmail = async (email: string) => {
  console.log(email, process.env.CLIENT_URL);

  const { data, error } = await supabase.auth.updateUser(
    {
      email: email,
    },
    {
      emailRedirectTo: `${process.env.CLIENT_URL}/email-updated`,
    }
  );

  if (error) {
    console.log(error);
    toast.error(error.message);
    return;
  }
  if (data) {
    console.log(data);
    return { data: "Password reset email is sent" };
  }
};
