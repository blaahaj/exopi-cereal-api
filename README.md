# Cereal API

## Installation

If you're using `asdf`, then run `asdf install`. Otherwise, please see F<.tool-versions> and install the versions shown.

Create the database:

```shell
sqlite3 cereals.db < schema.sql
sqlite3 cereals.db < initData.sql
```

Get the code running:

```shell
pnpm install
# At this point, you may then also need to run "pnpm approve-builds"
pnpm build
pnpm run dev
```

Upload the initial data:

```shell
curl -i -X POST -H "Authorization: Bearer TOKEN" --data-binary @cereal.csv http://localhost:7835/api/cereals/upload
```

where TOKEN (beginning `xcak`) is found in F<initData.sql>.

## The API

- GET http://localhost:7835/api/cereals/ (get all)
  - output is `{ "cereals": [...] }` where each item in the array is of the form shown below
  - sorting
    - `?sort` is a comma-separated list of sort fields
    - a sort field is an attribute name of `cereals`, optionally prefixed by `-` (to indicate DESC instead of ASC)
    - there is always a final implied `id` sort field, to ensure stable output
    - e.g. http://localhost:7835/api/cereals?sort=-shelf,mfr,name
    - as inspired by https://jsonapi.org/format/#fetching-sorting

- GET http://localhost:7835/api/cereals/:id (get one, by id)
  - Example output:

```json
{
  "cereal": {
    "id": "01KQ9VV66X5YX5G3MPDXV5BM3N",
    "name": "100% Natural Bran",
    "mfr": "Q",
    "type": "C",
    "calories": 120,
    "protein": 3,
    "fat": 5,
    "sodium": 15,
    "fiber": 2,
    "carbo": 8,
    "sugars": 8,
    "potass": 135,
    "vitamins": 0,
    "shelf": 3,
    "weight": 1,
    "cups": 1,
    "rating": 33
  }
}
```

- POST http://localhost:7835/api/cereals/ (create an entry)
  - request body JSON is as above, but without the `"id"`
  - response is of the form
