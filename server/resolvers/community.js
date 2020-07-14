import { promisify } from "../helper";
import community from "../model/community";
const User = require("../model/user");

const resolvers = {
  creator: (community) => promisify(User.findById(community.creator)),
  residents: (community) => promisify(User.find({community: community.id})).then((result) => result)

};

module.exports = resolvers;
