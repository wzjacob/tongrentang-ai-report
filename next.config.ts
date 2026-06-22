import os from "os";
import type { NextConfig } from "next";

/**
 * 开发模式下，Next 会拦截非 localhost 来源对 /_next 等开发资源的请求。
 * 用局域网 IP 访问时若不加入白名单，客户端脚本加载失败，页面区块空白、点击失效。
 * 内网正式发布请用：npm run release:intranet（生产构建，无此限制）。
 */
function getLanHostnames(): string[] {
  const hosts = new Set<string>();
  for (const addrs of Object.values(os.networkInterfaces())) {
    for (const addr of addrs ?? []) {
      if (addr.family === "IPv4" && !addr.internal) {
        hosts.add(addr.address.toLowerCase());
      }
    }
  }
  return [...hosts];
}

const extraFromEnv =
  process.env.NEXT_DEV_EXTRA_ORIGINS?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "::1", "[::1]", ...getLanHostnames(), ...extraFromEnv],
};

export default nextConfig;
