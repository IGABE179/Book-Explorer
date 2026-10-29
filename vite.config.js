import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
     base: '/Book-Explorer/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        books: 'books.html',
        favorites: 'favorites.html',
        about: 'about.html',
      },
    },
  },
})