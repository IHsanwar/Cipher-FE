import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // 👉 preset bawaan Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👉 override / tambahan aturan
  {
    rules: {
      // hanya warning - tidak blokir build
      "@typescript-eslint/no-unused-vars": "warn",

      // matikan strict React-Hooks dep check (hanya dev preferensi)
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
