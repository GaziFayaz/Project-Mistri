/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  // resolve: {
  //   alias: {
  //     "magic-sdk": path.resolve(
  //       __dirname,
  //       "node_modules/magic-sdk/dist/cjs/index.js"
  //     ),
  //   },
  // },
};
