import { ConnectionOptions } from "typeorm";

const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./src/migrations/*"],
    logging: true,
    migrationsRun: true,
    username: "thebedroomprogrammer",
    database: "test",
    ssl: false,
};

export default dbConfig;
