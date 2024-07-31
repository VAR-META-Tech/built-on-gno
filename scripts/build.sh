# !/bin/bash
set -eu

turbo prune server --docker

ls -la

cd apps/$BUILD_DIR

ls -la

pnpm turbo build --filter=$BUILD_DIR...

ls -la

zip -r artifacts.zip dist