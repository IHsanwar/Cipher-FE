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
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "next/next/no-img-element": "off"
  }
}
];
