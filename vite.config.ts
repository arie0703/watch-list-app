import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({ prefix: "",  mountedPath: "process.env" }) // vercel kvの環境変数を読み込むためにprocess.envが使える必要がある
  ],
})
