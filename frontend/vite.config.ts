import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    plugins: [
        sveltekit(),
        viteBasicSslPlugin()
    ],
    ssr: {
        external: ['reflect-metadata'],
    },
});
