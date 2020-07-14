import { promisify } from "../helper";

const Post = require("../model/post");
const User = require("../model/user");
const Community = require("../model/community");
const Chat = require("../model/chat");

const resolvers = {
  chats: (user) => promisify(Chat.find({participants: user.id})).then((result) => result),
  posts: (user) =>  promisify(Post.find({author: user.id})).then((result) => result),
  following: (user) => promisify(User.find({following: user.id})).then((result) => result),
  followers: (user) => promisify(User.find({followers: user.id})).then((result) => result),
  community: (user) => promisify(Community.findById(user.community))
  // author: (post) => promisify(User.findById(post.author)),
};

module.exports = resolvers;
