# Cereal API

## Installation

If you're using `asdf`, then run `asdf install`. Otherwise, please see F<.tool-versions> and install the versions shown.

Then:

```shell
pnpm install

# (You may then also need to run "pnpm approve-builds")

pnpm build
pnpm run dev
```

## Creating the database

```shell
sqlite3 cereals.db < schema.sql
```

## Uploading the initial data

```shell
curl -i -X POST --data-binary @cereal.csv http://localhost:7835/api/cereals/upload
```
