# AGENTS.md
Project ini menggunakan __Docker__ sebagai tools development. Jadi, seluruh cli/command WAJIB menjalankan (`run`) container docker. Kamu WAJIB mengikuti seluruh instruksi-instruksi yang diberikan dalam dokumentasi ini.

Setiap menjalankan container, WAJIB me-_mounting_ direktori ini sebagai working directory di dalam container.

## Informasi Development

- Project ini menggunakan __Angular__ sebagai framework UI-nya. Harap menggunakan referensi berikut untuk hal berkaitan dengan angular:
  - LLMS: https://angular.dev/llms.txt
  - Full LLMS: https://angular.dev/assets/context/llms-full.txt
- Direktori `build` adalah direktori yang berisi `Dockerfile` untuk kebutuhan project ini. Untuk nama dan tag image adalah: `tampaksiring:latest`

## Instruksi dan Aturan WAJIB Development UI

- TBD

## Instruksi dan Aturan WAJIB Development Logic

- TBD

## Aturan umum yang WAJIB dilakukan

- SELALU _run_ docker container dengan image `tampaksiring:latest` menggunakan argumen `--rm` agar container terhapus otomatis setiap task
- SELALU berikan __TODO__ list dalam setiap sesi pada mode `build`
- Untuk penambahan skill baru dari `https://skills.sh`, WAJIB menggunakan image `tampaksiring:latest` dan jalankan perintah sesuai dengan keterangan user
- Setiap penambahan skill lewat skills.sh, WAJIB gunakan opsi `-y` agar bersifat non-interactive

## Aturan umum yang DILARANG dilakukan

- DILARANG menjalankan task tanpa __TODO__ list
- DILARANG menjalankan task yang berhubungan dengan cli/command tanpa menjalankan docker container
