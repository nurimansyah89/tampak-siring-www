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

exec "$@"
