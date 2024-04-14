import axios from "axios";
import { supabase } from "@/lib/supabase";
import { encrypt } from "./decrypt";
import { toast } from "react-toastify";

export const platformIntegrateDevto = async (
  user_id: string,
  devto: string
) => {
  const apiKey = devto;
  const res = await axios.get("https://dev.to/api/users/me", {
    headers: {
      "api-key": apiKey,
    },
  });

  //@ts-ignore
  //edgefunction
  const ciphertext = encrypt(apiKey);

  const platformKey: any = {
    user_id: user_id,
    api_key: ciphertext,
    username: res.data.username,
    label: ["Personal"],
    value: [res.data.username],
    organization_id: [res.data.id],
  };

  const { error } = await supabase.from("devto_key").insert(platformKey);

  if (error) {
    //errordb
    console.log(error);
  }
  toast.success("Data Added Successfully");
  return { data: "Data Added Successfully" };
};

export const platformIntegrateHashnode = async (
  user_id: string,
  hashnode: string
) => {
  const apiKey = hashnode;
  const res: any = await axios({
    url: "https://gql.hashnode.com",
    method: "POST",
    headers: {
      Authorization: apiKey,
    },
    data: {
      query: `
        query Me {
          me {
            username
          }
        }
          `,
    },
  });

  //edgefunction
  const encryptedApiKey = encrypt(apiKey);

  const platformKey: any = {
    user_id: user_id,
    api_key: encryptedApiKey,
    username: res.data.data.me.username,
  };

  console.log(hashnode, platformKey);

  const { error } = await supabase.from("hashnode_key").insert(platformKey);

  if (error) {
    //errordb
    console.log(error);
  }
  toast.success("Data Added Successfully");
  return { data: "Data Added Successfully" };
};

export const updateDevto = async (user_id: string, devto: string) => {
  const apiKey = devto;
  const res = await axios.get("https://dev.to/api/users/me", {
    headers: {
      "api-key": apiKey,
    },
  });

  //@ts-ignore
  const ciphertext = encrypt(apiKey);

  const platformKey: any = {
    api_key: ciphertext,
    username: res.data.username,
    label: ["Personal"],
    value: [res.data.username],
    organization_id: [res.data.id],
  };

  console.log(user_id);

  const { error } = await supabase
    .from("devto_key")
    .update(platformKey)
    .eq("user_id", user_id);

  if (error) {
    console.log(error);
    //errordb
  }

  return { data: "Data Updated Successfully" };
};

export const updateHashnode = async (user_id: string, hashnode: string) => {
  const apiKey = hashnode;

  const res: any = await axios({
    url: "https://gql.hashnode.com",
    method: "POST",
    headers: {
      Authorization: apiKey,
    },
    data: {
      query: `
        query Me {
          me {
            username
          }
        }
          `,
    },
  });

  const encryptedApiKey = encrypt(apiKey);

  const platformKey: any = {
    api_key: encryptedApiKey,
    username: res.data.data.me.username,
  };

  const { error } = await supabase
    .from("hashnode_key")
    .update(platformKey)
    .eq("user_id", user_id);

  if (error) {
    //errordb
    console.log(error);
  }
  toast.success("Data Updated Successfully");
  return { data: "Data Updated Successfully" };
};

export const updateHashnodePublication = async (
  user_id: string,
  label: any,
  value: any
) => {
  const platformKey: any = {
    label: label,
    value: value,
  };

  console.log(platformKey);

  const { error } = await supabase
    .from("hashnode_key")
    .update(platformKey)
    .eq("user_id", user_id);

  if (error) {
    //errordb
    console.log(error);
  }
  toast.success("Data Updated Successfully");
  return { data: "Data Updated Successfully" };
};

export const updateDevtoPublication = async (
  user_id: string,
  label: any,
  value: any
) => {
  const fetchOrganization = async () => {
    const orgPromises = value.map(async (item: any) => {
      try {
        const res: any = await axios.get(
          `https://dev.to/api/users/by_username?url=${item}`
        );
        console.log(res.data.id);
        return res.data.id;
      } catch (error) {
        const res: any = await axios.get(
          `https://dev.to/api/organizations/${item}`
        );
        console.log(res.data.id);
        return res.data.id;
      }
    });

    // Wait for all promises to resolve
    const organizationIds = await Promise.all(orgPromises);
    return organizationIds;
  };

  const organizationIds = await fetchOrganization();

  const platformKey: any = {
    label: label,
    value: value,
    organization_id: organizationIds,
  };

  const { error } = await supabase
    .from("devto_key")
    .update(platformKey)
    .eq("user_id", user_id);

  if (error) {
    //errordb
    console.log(error);
  }
  toast.success("Data Updated Successfully");
  return { data: "Data Updated Successfully" };
};

export const checkIntegration = async (user_id: string) => {
  const { data, error } = await supabase
    .from("devto_key")
    .select()
    .eq("user_id", user_id);
  const { data: hashnodeData, error: hashnodeError } = await supabase
    .from("hashnode_key")
    .select()
    .eq("user_id", user_id);

  if (error) {
    //errordb
    console.log(error);
  }
  if (hashnodeError) {
    //errordb
    console.log(hashnodeError);
  }

  let resData: any;
  //@ts-ignore
  if (data || hashnodeData) {
    resData = {
      //@ts-ignore
      devto: data[0]?.api_key ? true : false,
      //@ts-ignore
      hashnode: hashnodeData[0]?.api_key ? true : false,
    };
  } else {
    resData = {
      devto: false,
      hashnode: false,
    };
  }

  // console.log(data[0].devto)

  return { data: resData };
};
