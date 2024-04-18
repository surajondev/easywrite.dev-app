import { supabase } from "@/lib/supabase";
import { decrypt } from "@/lib/crypto";
import axios from "axios";
import { DEVTO_URL } from "@/utils/constants/url";

export const devtoAnalytics = async (session: any) => {
  const user_id = session?.user?.id;

  // fetching the user data using user_id
  const { data, error } = await supabase
    .from("devto_key")
    .select()
    .eq("user_id", user_id);

  if (error) {
    //errordb
    console.log(error);
  }

  if (data?.length == 0) {
    return { error: "Add devto API Key" };
  }

  //@ts-ignore
  //edgefunction
  const decryptedApiKey = decrypt(data[0].api_key);

  const res = await axios.get(`${DEVTO_URL}/articles/me?per_page=1000`, {
    headers: {
      "api-key": decryptedApiKey,
      "Accept-Encoding": "gzip, deflate, br",
    },
  });

  const resData: any = res.data;

  if (resData.length === 0) {
    return { error: "Data not found!" };
  }

  const last_article_stats = () => {
    const stats = [
      {
        name: "Reactions",
        stat: resData[0].public_reactions_count,
      },
      {
        name: "Comments",
        stat: resData[0].comments_count,
      },
      {
        name: "Reading Time",
        stat: resData[0].reading_time_minutes,
      },
      {
        name: "Publish Date",
        stat: resData[0].readable_publish_date,
      },
    ];

    return stats;
  };

  const latest_article_stats = () => {
    let stats: {
      title: string[];
      reactions: { name: string; data: number[] };
      comments: { name: string; data: number[] };
    } = {
      title: [],
      reactions: { name: "Reactions", data: [] },
      comments: { name: "Comments", data: [] },
    };

    resData.filter((item: any, index: any) => {
      if (index < 5 && index < resData.length) {
        stats.title.push(item.title);
        stats.reactions.data.push(item.public_reactions_count);
        stats.comments.data.push(item.comments_count);
      }
    });

    return stats;
  };

  const randomStats = () => {
    let total_reactions: number = 0;
    let total_reading_time: number = 0;

    resData.filter((item: any) => {
      total_reactions += item.public_reactions_count;
      total_reading_time += item.reading_time_minutes;
    });

    const average_reactions = Math.round(total_reactions / resData.length);

    const firstArticleDate = new Date(resData[resData.length - 1].published_at);
    const lastArticleDate = new Date(resData[0].published_at);
    const frequency: number =
      (lastArticleDate.getTime() - firstArticleDate.getTime()) /
      (1000 * 3600 * 24) /
      resData.length;

    const roundOffFrequency = Math.round(frequency);
    const article_frequency = `1 Article/ ${roundOffFrequency} days`;

    return [
      {
        name: "Total Reactions",
        stat: total_reactions,
      },
      {
        name: "Total Reading Time",
        stat: total_reading_time,
      },
      {
        name: "Average Reactions",
        stat: average_reactions,
      },
      {
        name: "Average Frequency",
        stat: article_frequency,
      },
    ];
  };

  let articles_per_tag: any = [];
  const popularTags = () => {
    const popular_tags: any = [];

    for (let i = 0; i < resData.length; i++) {
      for (let j = 0; j < resData[i].tag_list.length; j++) {
        const tag: any = popular_tags.filter(
          (item: any) => item.tag === resData[i].tag_list[j]
        );
        if (tag.length > 0) {
          popular_tags[tag[0].id].count += resData[i].public_reactions_count;
          articles_per_tag[tag[0].id].y += 1;
        } else {
          popular_tags.push({
            id: popular_tags.length,
            tag: resData[i].tag_list[j],
            count: resData[i].public_reactions_count,
          });
          articles_per_tag.push({
            x: resData[i].tag_list[j],
            y: 1,
          });
        }
      }
    }

    const popular_tags_sorted = popular_tags
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);
    const data = popular_tags_sorted.map((item: any) => item.count);
    const label = popular_tags_sorted.map((item: any) => item.tag);
    return {
      data,
      label,
    };
  };

  const analyticsRes = {
    last_article_stats: last_article_stats(),
    latest_article_stats: latest_article_stats(),
    popular_tags: popularTags(),
    articles_per_tag,
    randomStats: randomStats(),
  };

  return analyticsRes;
};
