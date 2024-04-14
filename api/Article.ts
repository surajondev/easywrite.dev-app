import { supabase } from "@/lib/supabase";

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
  const ArticleData = {
    user_id: user_id,
    devto: devto,
    hashnode: hashnode,
    devto_data: devto_data,
    title: title,
    tags_devto: tags_devto,
    tags_hashnode: tags_hashnode,
    organization_id: organization_id,
    publicationId: publication_id,
    hashnode_data: hashnode_data,
    devto_time: devto_time,
    hashnode_time: hashnode_time,
    body_markdown: body_markdown,
  };

  // console.log(ArticleData)
  const { data, error } = await supabase
    .from("article")
    .insert(ArticleData)
    .select();

  if (error) {
    //errordb
    console.log(error);
  }
  return data;
};

export const deleteArticle = async (article_id: any) => {
  const articleId = article_id;

  console.log(articleId);
  const { data, error } = await supabase
    .from("article")
    .delete()
    .eq("article_id", articleId);

  if (error) {
    //errordb
    console.log(error);
  }
  return data;
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
  const { data, error } = await supabase
    .from("article")
    .update({
      devto,
      devto_data,
      title,
      tags_devto,
      organization_id,
      body_markdown,
      devto_time,
    })
    .eq("article_id", article_id)
    .select();

  if (error) {
    //errordb
    console.log(error);
  }
  return data;
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
  const { data, error } = await supabase
    .from("article")
    .update({
      hashnode,
      hashnode_data,
      title,
      tags_hashnode,
      publicationId,
      body_markdown,
      hashnode_time,
    })
    .eq("article_id", article_id)
    .select();

  if (error) {
    //errordb
    console.log(error);
  }
  return data;
};
