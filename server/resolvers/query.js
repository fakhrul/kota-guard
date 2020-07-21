import { promisify } from "../helper";

const Player = require("../model/player");
const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");
const LikePost = require("../model/likePost");
const Stock = require("../model/stock");
const StockComment = require("../model/stockComment");
const Chat = require("../model/chat");
const Notification = require("../model/notification");
const Community = require("../model/community");
const Service = require("../model/service");
const Unit = require("../model/unit");
const Visitor = require("../model/visitor");

const resolvers = {
  players: () =>
    Player.find({}, (error, players) => {
      if (error) throw new Error(error);
      console.log("players-------", players);
      return players;
    }),
  getPlayer: (_, args) =>
    Player.findById({ _id: args.id }, async (error, playerToReturn) => {
      if (error) throw new Error(error);
      return await playerToReturn;
    }),
  users: () =>
    User.find({}, (error, users) => {
      if (error) throw new Error(error);
      return users;
    }),
  user: (_, args) => promisify(User.findById(args.id)),
  getUser: (_, args) =>
    User.findById({ _id: args.id }, async (error, userToReturn) => {
      if (error) throw new Error(error);
      return userToReturn;
    }),
  // searchUsers(userId: String!, name: String!): [User]
  searchUsers: (_, args) => promisify(User.find({})).then((result) => result),
  userExist: (_, args) =>
    User.findOne({ email: args.email }, async (error, userToReturn) => {
      if (error) throw new Error(error);
      return userToReturn;
    }),
  post: (_, args) => promisify(Post.findById(args.id)).then((result) => result),
  posts: (_, args) =>
    promisify(Post.find({}).sort({ createdAt: "desc" })).then(
      (result) => result
    ),
  // userFeed(userId: String!): [Post]!
  userFeed: (_, args) =>
    promisify(Post.find({}).sort({ createdAt: "desc" })).then(
      (result) => result
    ),

  comment: (_, args) =>
    promisify(Comment.findById(args.id)).then((result) => result),
  comments: (_, args) =>
    promisify(Comment.find({ post: args.postId })).then((result) => result),
  likes: (_, args) =>
    promisify(LikePost.find({ post: args.postId })).then((result) => result),
  stock: (_, args) =>
    promisify(Stock.findById(args.id)).then((result) => result),
  stockComments: (_, args) =>
    promisify(StockComment.find({ stock: args.stockId })).then(
      (result) => result
    ),
  doesFollow: (_, args) =>
    promisify(User.findOne({ _id: args.userId, followers: args.targetId })),
  // chats(userId: String!): [Chat]
  chats: (_, args) =>
    promisify(
      Chat.find({
        participants: args.userId,
        messages: { $exists: true, $not: { $size: 0 } },
      })
    ).then((result) => result),
  // chat(chatId: String!): Chat!
  chat: (_, args) =>
    promisify(Chat.findById(args.chatId)).then((result) => result),
  // chatExists(userId: String!, targetId: String!): Chat
  chatExists: (_, args) =>
    promisify(
      Chat.findOne({ participants: { $in: [args.userId, args.targetId] } })
    ).then((result) => result),
  // userConnections(userId: String!, type: String!): [User]
  userConnections: (_, args) =>
    promisify(User.find({ following: { $in: [args.userId] } })).then(
      (result) => result
    ),
  // notifications(userId: String!): [Notification]
  notifications: (_, args) =>
    promisify(Notification.find({ user: args.userId })).then(
      (result) => result
    ),
  searchCommunity: (_, args) => promisify(Community.find({})).then((result) => result),
  community: (_, args) => promisify(Community.findById(args.id)).then((result) => result),
  servicesByCommunity: (_, args) => promisify(Service.find({ community: args.communityId})).then((result) => result),
  // service(id: String!): Service
  service: (_, args) => promisify(Service.findById(args.id)).then((result) => result),
  visitorsByCommunity: (_, args) => promisify(Visitor.find({ community: args.communityId})).then((result) => result),
  visitorsByHost: (_, args) => promisify(Visitor.find({ host: args.hostId})).then((result) => result),
  unit: (_, args) =>
    promisify(Unit.findById(args.id)).then((result) => result),
};

module.exports = resolvers;
