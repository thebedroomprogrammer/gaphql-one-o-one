import { User } from "./entities/User";

const resolvers = {
    Query: {
        users: async () => {
            const u = await User.find();
            return u;
        },
        user: async (_: any, args: any) => {
            const u = await User.findOne({ name: args.name });
            return u;
        },
    },

    Mutation: {
        deleteUser: async (_: any, args: any) => {
            const u = await User.delete({ id: args.id });

            return true;
        },
        createUser: async (_: any, args: any) => {
            const u = await User.create({ name: args.name }).save();
            return u;
        },
    },
};

export default resolvers;
