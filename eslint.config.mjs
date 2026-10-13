import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Separate Expo project, gitignored — it has its own tooling.
    "tribe-mobile/**",
    // Separate Next app (admin dashboard), gitignored — it has its own tooling.
    "tribe-admin/**",
  ]),
]);

export default eslintConfig;
