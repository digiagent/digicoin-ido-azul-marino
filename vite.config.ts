import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: { allowedHosts: true },

    ssr: {
      noExternal: ['mailgun.js'],
      external: ['@x402/evm']
    },

    build: {
      rollupOptions: {
        external: ['mailgun.js', '@x402/evm']
      }
    }
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
