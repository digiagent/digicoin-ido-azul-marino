import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: { allowedHosts: true },

    ssr: {
      noExternal: ['mailgun.js'],
    },

    build: {
      rollupOptions: {
        external: ['mailgun.js']
      }
    }
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
