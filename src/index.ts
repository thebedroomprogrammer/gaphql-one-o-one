import "reflect-metadata";
import dbConfig from "./conn";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import cors from "cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import {
    Arg,
    buildSchema,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";

import { Todo } from "./entities/Todo";

@Resolver(() => Todo)
class TodoResolver {
    @Query(() => [Todo])
    async todos() {
        const data = await Todo.find();
        return data;
    }

    @Mutation(() => Todo)
    async createTodo(@Arg("title") title: string, @Arg("text") text: string) {
        const todo = await Todo.create({ title, text }).save();
        return todo;
    }

    @Mutation(() => Boolean)
    async deleteTodo(@Arg("id") id: number) {
        await Todo.delete({ id });
        return true;
    }
}

async function main() {
    const app = express();
    app.use(cors());
    app.get("/ping", (req, res) => {
        res.send("pong");
    });

    await createConnection(dbConfig);

    const schema = await buildSchema({
        resolvers: [TodoResolver],
    });
    const apolloServer = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
    });

    app.listen(4000, () => {
        console.log("Started");
    });
}

main();
