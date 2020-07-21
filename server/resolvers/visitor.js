import { promisify } from "../helper";

const User = require("../model/user");
const Community = require("../model/community");
const Unit = require("../model/unit");

const resolvers = {
    creator: (visitor) => promisify(User.findById(visitor.creator)),
    community: (visitor) => promisify(Community.findById(visitor.community)),
    unit: (visitor) => promisify(Unit.findById(visitor.unit)),
    host: (visitor) => promisify(User.findById(visitor.host)),
};

module.exports = resolvers;
