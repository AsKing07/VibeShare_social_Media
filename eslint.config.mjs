import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      js,
      react: pluginReact,
      "react-hooks": pluginReact,
    },
    extends: ["js/recommended", "eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "next/core-web-vitals",],
    rules: {
      "no-unused-vars": "warn", // Avertit sur les variables non utilisées
      "no-explicit-any": "warn",
      "no-undef": "error", // Erreur sur les variables non définies
      "no-console": "warn", // Avertissement sur les console.log
      "react/prop-types": "off", // Désactive l'obligation des propTypes si tu utilises TypeScript
      "react/react-in-jsx-scope": "off", // Next.js n'a pas besoin d'importer React dans chaque fichier
  "react-hooks/rules-of-hooks": "error",
  "semi": ["error", "always"] 

    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginReact.configs.flat.recommended,
]);


