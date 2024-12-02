/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  env: {
    NEXT_PUBLIC_MYKU_API_URL: "https://myapi.ku.th",
    cdn: "https://s3.tech.nisit.ku.ac.th",
    NEXT_PUBLIC_CLARITY_PROJECT_ID: "p7pr1c4quq",
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "GTM-WQLCTRM5",
  },
  output: "standalone",
};

export default config;
