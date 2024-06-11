import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path';

export default defineConfig(({mode}) => {
  dotenv.config({path: path.resolve(__dirname, './.env')});
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  // const {GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');
  // const {GOOGLE_MAPS_ID_KEY = ''} = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // define: {
      //   'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY),
      //   'process.env.GOOGLE_MAPS_ID_KEY': JSON.stringify(GOOGLE_MAPS_ID_KEY)
      // },
  };
});