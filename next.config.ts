import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xefeqsuodafojnjsebrd.supabase.co", // dominio de la fuente de imágenes
        port: "",                // opcional, si usas un puerto específico
        pathname: "/**",         // patrón de rutas permitido
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;