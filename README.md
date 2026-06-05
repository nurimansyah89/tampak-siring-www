# Tampaksiring

Project ini menggunakan Docker untuk development. Semua perintah Angular CLI dijalankan melalui container `tampaksiring:latest`.

Volume yang digunakan:
- `tampaksiring-home` → `/root` (SSH keys, GPG keys, npm cache)
- `tampaksiring-node-modules` → `/app/node_modules` (persistent dependencies)
- `${PWD}` → `/app` (project source code)

## Development server

Jalankan development server dengan perintah:

```powershell
docker run --rm -it `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    -p 4200:4200 `
    tampaksiring:latest ng serve --host 0.0.0.0 --allowed-hosts
```

Buka browser dan navigasi ke `http://localhost:4200/`. Aplikasi akan auto-reload saat ada perubahan file.

## Code scaffolding

Untuk generate component baru:

```powershell
docker run --rm -it `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    tampaksiring:latest ng generate component component-name
```

Untuk daftar lengkap schematic yang tersedia:

```powershell
docker run --rm -it `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    tampaksiring:latest ng generate --help
```

## Building

```powershell
docker run --rm `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    tampaksiring:latest ng build
```

Build artifacts akan tersimpan di `dist/` directory.

## Running unit tests

```powershell
docker run --rm `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    tampaksiring:latest ng test --no-watch
```

## Running end-to-end tests

Untuk e2e testing:

```powershell
docker run --rm -it `
    -v tampaksiring-home:/root `
    -v tampaksiring-node-modules:/app/node_modules `
    -v ${PWD}:/app `
    -e NG_CLI_ANALYTICS=false `
    tampaksiring:latest ng e2e
```

Angular CLI tidak menyertakan framework e2e secara default. Pilih framework yang sesuai dengan kebutuhan.

## Additional Resources

Untuk informasi lebih lanjut tentang Angular CLI, kunjungi [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
