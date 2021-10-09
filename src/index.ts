import dbConfig from "./conn";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import schema from "./schema";
import resolvers from "./resolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

async function main() {
    const app = express();

    app.get("/ping", (req, res) => {
        res.send("pong");
    });

    await createConnection(dbConfig);

    const graphqlServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await graphqlServer.start();
    graphqlServer.applyMiddleware({
        app,
    });

    app.listen(3000, () => {
        console.log("Started");
    });
}

main();
