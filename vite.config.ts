import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/money-vault/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Money Vault',
        short_name: 'MoVault',
        description: 'Finanzas personales',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        lang: 'es',
      },
    }),
  ],
})
