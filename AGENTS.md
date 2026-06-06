# AGENTS.md
Project ini menggunakan __Docker__ sebagai tools development. Jadi, seluruh cli/command WAJIB menjalankan (`run`) container docker. Kamu WAJIB mengikuti seluruh instruksi-instruksi yang diberikan dalam dokumentasi ini.

Setiap menjalankan container, WAJIB me-_mounting_ direktori ini sebagai working directory di dalam container.

## Informasi Development

- Project ini menggunakan __Angular__ sebagai framework UI-nya. Harap menggunakan referensi berikut untuk hal berkaitan dengan angular:
  - LLMS: https://angular.dev/llms.txt
  - Full LLMS: https://angular.dev/assets/context/llms-full.txt
- Direktori `build` adalah direktori yang berisi `Dockerfile` untuk kebutuhan project ini. Untuk nama dan tag image adalah: `tampaksiring:latest`

### 🎨 Pembuatan UI & Layout (Tailwind CSS)

Ketika membuat, melakukan *refactoring*, atau menerjemahkan referensi kode mentah menjadi HTML/komponen UI menggunakan Tailwind CSS, Anda HARUS bertindak sebagai UI/UX Engineer yang ketat. Jaga konsistensi dan kerapian kode secara absolut di semua file dengan mematuhi aturan berikut:

1. **Prioritas Utama: Semantik & Konsistensi Struktur**
   - **Wajib Semantic HTML:** Sebisa mungkin, gunakan tag HTML5 semantik (seperti `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`, `<form>`) sebagai fondasi utama layout. Jangan gunakan `<div>` jika ada tag semantik yang lebih tepat untuk menggambarkan fungsi elemen tersebut.
   - **Hindari "Div Soup":** Gunakan elemen `<div>` hanya jika benar-benar diperlukan, seperti untuk kontainer pembungkus (*wrapper*) atau kebutuhan penataan *flex/grid layout* yang tidak memiliki arti semantik. Bersihkan `<div>` yang bertumpuk tanpa makna.
   - **Konsistensi Tag HTML:** Gunakan pola struktur yang identik untuk komponen yang serupa di berbagai file. Dilarang keras menggunakan `<section>` untuk komponen *card* di satu file, tetapi menggunakan `<div>` untuk *card* yang sama di file lain.
   - **Penulisan Tag Kosong:** Selalu gunakan *self-closing tag* untuk elemen yang tidak memiliki konten (misalnya, `<img />`, `<input />`, `<br />`).

2. **Indentasi & Format yang Ketat:**
   - Pertahankan hierarki *DOM tree* yang terstruktur dan mudah dibaca. Gunakan standar indentasi 2 spasi.
   - Jika pengguna memberikan referensi HTML yang berantakan, Anda wajib membersihkan spasi yang tidak teratur, menghapus baris kosong yang tidak perlu di antara tag, dan merapikan *nesting* (persarangan) elemen.

3. **Manajemen Class Tailwind:**
   - **Urutan Penulisan:** Deklarasikan *class* Tailwind secara terurut dan logis dengan hierarki berikut: 
     *Layout/Posisi -> Spasi (Margin/Padding) -> Ukuran (Width/Height) -> Tipografi -> Warna -> Border -> Efek/Transisi.*
   - **Contoh Penulisan yang Benar:** `class="absolute top-0 flex flex-col justify-between p-4 w-full h-auto text-sm font-semibold text-gray-800 bg-white border-b shadow-sm"`
   - Dilarang menyertakan *class* utilitas yang berulang atau saling bertentangan (contoh: meletakkan `p-4` dan `p-2` di elemen yang sama).

4. **Refactoring Input yang Berantakan:**
   - Jika Anda menerima potongan kode referensi HTML yang kotor, usang, atau tidak terstruktur, langkah PERTAMA Anda adalah membangun ulang struktur DOM agar rapi dan semantik.
   - Hapus semua *inline styles* (`style="..."`) dan ubah sepenuhnya menjadi *class* utilitas Tailwind CSS.

## Instruksi dan Aturan WAJIB Development UI

- SELALU gunakan `DESIGN.md` sebagai acuan membuat UI/Komponen
- Gunakan referensi https://tailwindcss.com/docs/adding-custom-styles apabila ingin membuat dan menggunakan style custom
- SELALU gunakan nama class yang sudah ada di tailwindcss
- DILARANG membuat/menggunakan file inline-css atau scoped css pada component angular. Gunakan selalu metode atau flow dari tailwindcss
- Untuk penggunaan CSS eksternal, buat file pada folder `src/theme/<nama-file>.css`
- WAJIB gunakan `templateUrl` (bukan `template` inline) untuk memisahkan file HTML dari `.ts`. DILARANG menulis HTML di dalam file `.ts`. File `.ts` hanya berisi logic, file `.html` berisi markup.
- Referensi file HTML hanya sebagai referensi layout. DILARANG secara langsung mengikuti styling css yang mirip dengan referensi. SELALU mengikuti arahan dari user atau tanya user jika bingung terkait referensi layout/UI halaman/fitur

## Instruksi dan Aturan WAJIB Development Logic

- SELALU gunakan aturan-aturan/skill dari angular dalam pembuatan komponen dan logicnya
- Gunakan best-practices angular model "Feature Base", jadi setiap fitur minimal mempunyai rute masing-masing (Tapi tidak wajib punya rute, terkait kondisi dan persyaratan)
- Selalu gunakan mode rute `Server` (Bukan `Pre-Render`) pada setiap pembuatan/inisiasi fitur yang mempunyai rute
- Fitur-fitur admin (yang berada di bawah path `/admin/*`) WAJIB ditempatkan di dalam folder `src/app/features/admin/<nama-fitur>/`, bukan folder terpisah di `src/app/features/`

## Instruksi dan Aturan WAJIB Konfigurasi Environment

- Gunakan `src/environments/environment.ts` untuk konfigurasi **client-side (non-credential)**:
  - Hanya berisi: API base URL, nama aplikasi, feature flags, dll.
  - Buat file `environment.prod.ts` untuk override production
  - Daftarkan `fileReplacements` di `angular.json`
  - DILARANG keras menyimpan credentials, API keys, atau secret apapun di sini
- Gunakan **environment variable** (`process.env`) di `server.ts` untuk konfigurasi **server-side (credential)**:
  - Credentials (API_KEY, DB_URL, JWT_SECRET) cukup dibaca langsung via `process.env` — tidak perlu fetch dari endpoint manapun
  - Hanya non-sensitive config yang secara **eksplisit** di-expose ke client via endpoint `/api/config` di `server.ts`
- Untuk development SSR, env variable bisa menggunakan file `.env` (wajib ada `.env.example` sebagai template)
- DILARANG menyimpan server-side credentials / API keys di `src/environments/`
- Gunakan `src/app/core/services/config.service.ts` sebagai abstraction layer untuk mengakses konfigurasi dari komponen (client-side) dan dari `server.ts` (server-side)
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
- SELALU gunakan git yang ada didalam container saat melakukan aksi-aksi terkait git (`commit/pull/push/etc`)
- SELALU membuat/meng-update file spesifikasi test jika ada penambahan/update UI/Logic

## Aturan umum yang DILARANG dilakukan

- DILARANG menjalankan task tanpa __TODO__ list
- DILARANG menjalankan task yang berhubungan dengan cli/command tanpa menjalankan docker container
- DILARANG menjalankan test (unit-test) tanpa se-izin user. Apapun kondisinya, apabila ingin menjalankan test, WAJIB verifikasi user terlebih dahulu
