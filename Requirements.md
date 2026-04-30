# Requirements

- import the provided data (unclear if one-off, or via API, or what)
- parser / update requirement is unlcear
- GET item by ID
- GET all items
- Sorting / filtering requirement is unclear
  - filter by ~ stuff ~ using = and more (e.g. != < > <= >=)
  - sort by ~ stuff ~
- POST
  - POST with id: check exists, update if yes, error "om at man ikke selv kan vælge ID på nye objekter" if not
    - REST would use PUT
  - POST without id to create
    - unclear if same endpoint or not
- DELETE something
- Authz/Authn. GET requires no authz, POST/DELETE requires that "man skal have brugernavn og
  password"
- GET product image by product ID (even if the returned resource is selected using mfr_code (? - "producent"))
