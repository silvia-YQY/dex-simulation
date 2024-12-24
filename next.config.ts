import { NextConfig } from "next";
import WindiCSSWebpackPlugin from "windicss-webpack-plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin({}));
    return config;
  },
};

export default nextConfig;
