import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tsconfigPaths from 'vite-tsconfig-paths';
import pluginChecker from 'vite-plugin-checker';

// export default defineConfig(({mode}) => {
//   dotenv.config({path: path.resolve(__dirname, './.env')});
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
//   // const {GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');
//   // const {GOOGLE_MAPS_ID_KEY = ''} = loadEnv(mode, process.cwd(), '');

//   return {
//     plugins: [react()],
//     // define: {
//       //   'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY),
//       //   'process.env.GOOGLE_MAPS_ID_KEY': JSON.stringify(GOOGLE_MAPS_ID_KEY)
//       // },
//   };
// });

const envExists = fs.existsSync('./.env');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const lintCommand = pkg.scripts.lint;

export default ({ mode }: { mode: string }) => {
	// make app-level environment variables available in the config
	dotenv.config({ path: envExists ? './.env' : './.env.template' });
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// constants
	const PORT: number = Number(process.env.PORT) || 3000;
	const HTTPS: boolean = process.env.HTTPS === 'true';

	// return the Vite config
	return defineConfig({
		plugins: [
			tsconfigPaths(),
			pluginChecker({
				overlay: { initialIsOpen: 'error' },
				typescript: true,
				eslint: { lintCommand },
			}),
			react(),
			basicSsl({
				name: 'south-bay-specials',
				domains: [
					'web.south-bay-specials.localhost',
					`web.south-bay-specials.localhost:${PORT}`,
				],
			}),
		],
		server: {
			// open the browser when the server starts
			open: `https://web.south-bay-specials.localhost:${PORT}`,
			// use the specified PORT
			port: PORT,
			// allow access from other devices on the same network
			host: true,
			// enable HTTPS
			https: HTTPS,
		},
		preview: {
			// open the browser when the server starts
			open: `https://web.south-bay-specials.localhost:${PORT}`,
			// use the specified PORT
			port: PORT,
			// enable HTTPS
			https: HTTPS,
		},
		envPrefix: 'REACT_APP_',
		build: {
			outDir: 'build',
			assetsDir: 'static',
		},
	});
};
