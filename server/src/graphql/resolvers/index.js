import { userQueries, userMutations } from "./userResolver";
import { postQueries, postMutations } from "./postResolver";
import { GraphQLUpload } from "graphql-upload";

const resolvers = {
  Upload: GraphQLUpload,
  Query: { ...userQueries, ...postQueries },
  Mutation: { ...userMutations, ...postMutations },
};

export default resolvers;
