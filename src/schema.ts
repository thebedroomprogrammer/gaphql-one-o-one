import { gql } from "apollo-server-core";

const schema = gql`
    type User {
        name: String!
        id: String!
    }

    type Query {
        users: [User!]!
        user(name: String!): User!
    }

    type Mutation {
        deleteUser(id: ID!): Boolean!
        createUser(name: String!): User!
    }
`;

export default schema;
