import { promisify } from "../helper";
const User = require("../model/user");
const Visitor = require("../model/visitor");

const resolvers = {
    author: remarks => promisify(User.findById(remarks.author)),
    visitor: remarks => promisify(Visitor.findById(remarks.visitor)),
};

module.exports = resolvers;

