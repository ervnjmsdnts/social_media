import { userQueries, userMutations } from "./userResolver";
import { postQueries, postMutations } from "./postResolver";

const resolvers = {
  Query: { ...userQueries, ...postQueries },
  Mutation: { ...userMutations, ...postMutations },
};

export default resolvers;
