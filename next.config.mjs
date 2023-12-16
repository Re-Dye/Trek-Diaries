// @ts-check
import withPlaiceholder from "@plaiceholder/next"

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    rewrites: async () => {
        return [
          {
            source: "/api/flask/:path*",
            destination:
              process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:5000//:path*"
                : "/api/flask/",
          },
        ];
}};

export default withPlaiceholder(nextConfig);
