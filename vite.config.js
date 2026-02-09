import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css','resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        // port: 5173,
        // origin: 'http://pendaftaran_mahasiswa.test:5173',
        // // Ensure Vite allows requests from the Laravel page origin (no more CORS mismatch)
        // cors: {
        //     origin: 'http://pendaftaran_mahasiswa.test',
        //     credentials: true,
        // },
        // hmr: {
        //     host: 'pendaftaran_mahasiswa.test',
        //     protocol: 'ws',
        //     port: 5173,
        // },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
