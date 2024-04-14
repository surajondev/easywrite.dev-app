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
    email: values.email,
  };

  const { error } = await supabase
    .from("users")
    .update(user)
    .eq("user_id", session.user.id);

  if (error) {
    console.log(error);
    toast.error(error.message);
  }
  toast.success("User Updated");
  return { data: "User Updated" };
};

export const changePassword = async (email: string) => {
  console.log(email, process.env.SUPABASE_URL);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.SUPABASE_URL}/update-password`,
  });

  if (error) {
    console.log(error);
    toast.error(error.message);
  }

  return { data: "Password reset email is sent" };
};
