import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nuftasbytmswzhbcsfad.supabase.co",
        pathname: "/storage/v1/object/public/games/**",
      },
      {
        protocol: "https",
        hostname: "nuftasbytmswzhbcsfad.supabase.co",
        pathname: "/storage/v1/object/public/blogs/**",
      },
      {
        protocol: "https",
        hostname: "nuftasbytmswzhbcsfad.supabase.co",
        pathname: "/storage/v1/object/public/users_avatars/**", // Add this line
      },
    ],
  },

  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default withNextIntl(nextConfig);
