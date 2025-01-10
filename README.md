## Project setup
```
$ yarn install --frozen-lockfile
```
## Compile and run the project

# Work mode
```
$ yarn run start:dev
```
# Add dependencies
$ yarn add ${name}

# Dont forget! Before every commit
```
$ yarn run format
```
## TypeORM instructions
* Create a new entity in [directory](./src/common/entities)
* Add a new entity to [import array](./src/common/entities/index.ts)
* Generate a new migration for this entity

```bash
$ yarn run typeorm:migration:generate ./src/common/migrations/{name}
# example
$ yarn run typeorm:migration:generate ./src/common/migrations/create-users
```

## Additional
# Swagger
http://localhost:8080/api/library/api-docs