import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: { allowedHosts: true },
    ssr: {
      noExternal: ['mailgun.js'],
      external: ['@x402/evm']
    },
    resolve: {
      conditions: ['node', 'import', 'require'],
    },
    build: {
      rollupOptions: {
        external: ['@x402/evm', 'mailgun.js']
      }
    }
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
