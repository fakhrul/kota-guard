import { promisify } from "../helper";
const User = require("../model/user");
const Unit = require("../model/unit");

const resolvers = {
  creator: (community) => promisify(User.findById(community.creator)),
  residents: (community) => promisify(User.find({community: community.id})).then((result) => result),
  units: (community) => promisify(Unit.find({community: community.id})).then((result) => result)

};

module.exports = resolvers;
