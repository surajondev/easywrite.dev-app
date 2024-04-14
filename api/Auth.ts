import { countries } from "@/utils/constants/countries";
import { supabase } from "@/lib/supabase";

export const register = async ({
  first_name,
  last_name,
  email,
  password,
  profile_img,
}: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const country = countries[timezone];
  const register: any = {
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
      },
    },
  };

  const { data: registerData, error: registerError } =
    await supabase.auth.signUp(register);

  if (registerError) {
    console.log(registerError); //errordb
  }

  const user: any = {
    user_id: registerData?.user?.id,
    first_name: first_name,
    last_name: last_name,
    profile_img: profile_img,
    email: email,
    country: country,
  };

  const { error: userError } = await supabase.from("users").insert(user);

  if (userError) {
    //edgefunction
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
      //@ts-ignore
      registerData.user.id
    );

    if (deleteUserError) {
      console.log(deleteUserError);
    }

    console.log(deleteUserError);
  }

  return registerData;
};

export const login = async ({ email, password }: any) => {
  try {
    const login: any = {
      email: email,
      password: password,
    };

    const { data, error } = await supabase.auth.signInWithPassword(login);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    //errordb
    console.log(error);
    //   return error
  }
};
