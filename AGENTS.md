# AGENTS.md
Project ini menggunakan __Docker__ sebagai tools development. Jadi, seluruh cli/command WAJIB menjalankan (`run`) container docker. Kamu WAJIB mengikuti seluruh instruksi-instruksi yang diberikan dalam dokumentasi ini.

Setiap menjalankan container, WAJIB me-_mounting_ direktori ini sebagai working directory di dalam container.

## Informasi Development

- Project ini menggunakan __Angular__ sebagai framework UI-nya. Harap menggunakan referensi berikut untuk hal berkaitan dengan angular:
  - LLMS: https://angular.dev/llms.txt
  - Full LLMS: https://angular.dev/assets/context/llms-full.txt
- Direktori `build` adalah direktori yang berisi `Dockerfile` untuk kebutuhan project ini. Untuk nama dan tag image adalah: `tampaksiring:latest`

## Instruksi dan Aturan WAJIB Development UI

- SELALU gunakan `DESIGN.md` sebagai acuan membuat UI/Komponen
- Gunakan referensi https://tailwindcss.com/docs/adding-custom-styles apabila ingin membuat dan menggunakan style custom
- SELALU gunakan nama class yang sudah ada di tailwindcss
- DILARANG membuat/menggunakan file inline-css atau scoped css pada component angular. Gunakan selalu metode atau flow dari tailwindcss
- Untuk penggunaan CSS eksternal, buat file pada folder `src/theme/<nama-file>.css`
- WAJIB gunakan `templateUrl` (bukan `template` inline) untuk memisahkan file HTML dari `.ts`. DILARANG menulis HTML di dalam file `.ts`. File `.ts` hanya berisi logic, file `.html` berisi markup.

## Instruksi dan Aturan WAJIB Development Logic

- SELALU gunakan aturan-aturan/skill dari angular dalam pembuatan komponen dan logicnya
- Gunakan best-practices angular model "Feature Base", jadi setiap fitur minimal mempunyai rute masing-masing (Tapi tidak wajib punya rute, terkait kondisi dan persyaratan)
- Selalu gunakan mode rute `Server` (Bukan `Pre-Render`) pada setiap pembuatan/inisiasi fitur yang mempunyai rute

## Instruksi dan Aturan WAJIB Konfigurasi Environment

- Gunakan `src/environments/environment.ts` untuk konfigurasi **client-side (non-credential)**:
  - Hanya berisi: API base URL, nama aplikasi, feature flags, dll.
  - Buat file `environment.prod.ts` untuk override production
  - Daftarkan `fileReplacements` di `angular.json`
  - DILARANG keras menyimpan credentials, API keys, atau secret apapun di sini
- Gunakan **environment variable** (`process.env`) di `server.ts` untuk konfigurasi **server-side (credential)**:
  - Credentials (API_KEY, DB_URL, JWT_SECRET) hanya diakses di server
  - Non-sensitive config bisa diekspos ke client via endpoint `/api/config`
- Gunakan `src/app/core/services/config.service.ts` sebagai abstraction layer untuk mengakses konfigurasi dari komponen
- Buat file `.env.example` sebagai dokumentasi environment variable yang dibutuhkan
- WAJIB tambahkan `.env` ke `.gitignore`
- Saat menjalankan container Docker, gunakan `--env-file .env` untuk memberikan environment variable

## Aturan umum yang WAJIB dilakukan

- SELALU _run_ docker container dengan image `tampaksiring:latest` menggunakan argumen `--rm` agar container terhapus otomatis setiap task
- SELALU mount volume `tampaksiring-home` setiap menjalankan container `tampaksiring:latest`
- SELALU mount volume `tampaksiring-node-modules` setiap menjalankan container `tampaksiring:latest`
- SELALU berikan __TODO__ list dalam setiap sesi pada mode `build`
- Untuk penambahan skill baru dari `https://skills.sh`, WAJIB menggunakan image `tampaksiring:latest` dan jalankan perintah sesuai dengan keterangan user
- Setiap penambahan skill lewat skills.sh, WAJIB gunakan opsi `-y` agar bersifat non-interactive
- SELALU pastikan hasil build dalam kondisi clean (no error, no warning) sebelum melanjutkan ke task berikutnya
- SELALU gunakan bahasa Indonesia dalam dokumentasi. Kecuali kodingan, WAJIB bahasa Inggris (komentar, deklarasi, dll.)

## Aturan umum yang DILARANG dilakukan

- DILARANG menjalankan task tanpa __TODO__ list
- DILARANG menjalankan task yang berhubungan dengan cli/command tanpa menjalankan docker container
