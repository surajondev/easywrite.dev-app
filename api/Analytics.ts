import axios from "axios";
import { supabase } from "@/lib/supabase";

export const devtoAnalytics = async (session: any) => {
  console.log(session);
  try {
    const user_id = session?.user?.id;
    const { data, error } = await supabase
      .from("devto_key")
      .select()
      .eq("user_id", user_id);

    if (error) {
      console.log(error);
    }

    if (data?.length == 0) {
      return { error: "Add devto API Key" };
    } else {
      let decryptedApiKey;

      const { data: decryptData, error: decryptError }: any =
        await supabase.functions.invoke("decrypt", {
          //@ts-ignore
          body: { api_key: data[0]?.api_key },
        });
      if (decryptError) {
        console.log(decryptError);
      } else {
        console.log(decryptData);
        decryptedApiKey = decryptData.data;
      }
      const res = await axios.post(`/api/devto-analytics`, {
        decryptedApiKey: decryptedApiKey,
      });
      return res.data;
    }
  } catch (error: any) {
    console.log(error);
  }
};
