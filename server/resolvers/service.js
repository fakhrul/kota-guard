import { promisify } from "../helper";

const User = require("../model/user");
const Community = require("../model/community");

const resolvers = {
    creator: (billing) => promisify(User.findById(billing.creator)),
    community: (billing) => promisify(Community.findById(billing.community))
};

module.exports = resolvers;
