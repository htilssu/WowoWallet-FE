import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./SignInPage": "./src/modules/federation/SignInFederation.jsx",
        "./SignUpPage": "./src/modules/federation/SignUpFederation.jsx",
      },
      shared: [
        "react",
        "react-dom",
        "@mantine/core",
        "@mantine/form",
        "react-router-dom",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
