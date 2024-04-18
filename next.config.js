/** @type {import('next').NextConfig} */
require("dotenv").config;

const nextConfig = {
  images: {
    domains: [
      "wallpapercave.com",
      "e1.pxfuel.com",
      "profiles.bugcrowdusercontent.com",
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON: process.env.SUPABASE_ANON,
    CLIENT_URL: process.env.CLIENT_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
