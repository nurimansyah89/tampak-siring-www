#!/bin/sh

git config --global user.name "Nurimansyah Rifwan"
git config --global user.email "nurimansyah.rifwan@gmail.com"

if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
    mkdir -p "$HOME/.ssh"
    ssh-keygen -t ed25519 -f "$HOME/.ssh/id_ed25519" -N '' -C "nurimansyah.rifwan@gmail.com"
fi

if ! gpg --list-keys "nurimansyah.rifwan@gmail.com" > /dev/null 2>&1; then
    cat > /tmp/gpg-batch <<EOF
Key-Type: eddsa
Key-Curve: ed25519
Subkey-Type: ecdh
Subkey-Curve: cv25519
Name-Real: Nurimansyah Rifwan
Name-Email: nurimansyah.rifwan@gmail.com
Expire-Date: 0
Passphrase: ''
EOF
    gpg --batch --generate-key /tmp/gpg-batch
    rm /tmp/gpg-batch
fi

if [ ! -f "angular.json" ]; then
    echo "Initializing Angular project with SSR and Tailwind CSS..."

    # Backup files that conflict with ng new scaffolding
    if [ -f "README.md" ]; then
        mv README.md /tmp/README.md.bak
    fi

    ng new tampaksiring \
        --directory . \
        --ssr \
        --style=tailwind \
        --force \
        --skip-git \
        --routing \
        --package-manager=npm \
        --test-runner=vitest \
        --strict \
        --defaults

    # Restore original README if Angular's version wasn't created
    if [ -f "/tmp/README.md.bak" ] && [ ! -f "README.md" ]; then
        mv /tmp/README.md.bak README.md
    fi

    echo "Angular project initialized."
fi

exec "$@"
