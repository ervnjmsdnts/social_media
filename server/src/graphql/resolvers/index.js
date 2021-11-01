import { userQueries, userMutations } from "./userResolver";

const resolvers = {
  Query: { ...userQueries },
  Mutation: { ...userMutations },
};

export default resolvers;
