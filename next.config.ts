import type { NextConfig } from "next";

/**
 * 开发模式下，Next 会拦截非 localhost 来源对 /_next 等开发资源的请求。
 * 用 127.0.0.1、局域网 IP 或远程转发域名访问时，若不加入白名单，客户端脚本加载失败，
 * 会出现 Recharts 等仅客户端渲染的区块空白。
 *
 * 局域网示例：NEXT_DEV_EXTRA_ORIGINS=192.168.1.10,172.16.106.178 npm run dev
 */
const extraFromEnv =
  process.env.NEXT_DEV_EXTRA_ORIGINS?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "::1", "[::1]", ...extraFromEnv],
};

export default nextConfig;
