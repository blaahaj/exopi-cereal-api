# Solution

Stack:

- TypeScript, using the NextJS framework
- Effect, principally for input data validation
- TypeORM, to access the database
- SQLite for persistence

## The database

- cereals (the main data)
- users / api_keys (for authn/authz)

An API is provided for manipulating `cereals`. No API is provided for manipulating `users` / `api_keys`.

The primary key `id`s used are ULIDs.

## Authentication

Since the requirement to create a front end came quite late in the project, the authentication was designed around the API, not the UI. Therefore "username and password" is interpreted to mean "API key".

Authentication via the UI is therefore unconventional: paste your API key into the relevant field in the toolbar in order to unlock the "write" operations.
