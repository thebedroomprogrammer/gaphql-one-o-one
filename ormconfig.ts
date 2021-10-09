const SnakeNamingStrategy =
    require("typeorm-naming-strategies").SnakeNamingStrategy;

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    user: "thebedroomprogrammer",
    database: "test",
    entities: ["src/entities/*.ts"],
    migrationsTableName: "migrations",
    migrations: ["src/migrations/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
    cli: {
        migrationsDir: "src/migrations",
        entitiesDir: "src/entities",
    },
};
