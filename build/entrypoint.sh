#!/bin/sh

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
