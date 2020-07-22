require("../connectors");
import Query from "./query";
import Mutation from "./mutation";
import DateTime from "./dateTime";
import Post from "./post";
import User from "./user";
import Comment from "./comment";
import Subscription from "./subscription";
import LikePost from "./likePost"
import Stock from "./stock";
import Message from "./message";
import Chat from "./chat";
import Notification from "./notification"
import Community from "./community";
import Service from "./service";
import Visitor from "./visitor";
import Remarks from "./remarks";

const resolvers = {User, Post, Comment, LikePost, Query, Stock, Message, Chat, Notification,Community, Service, Mutation, Subscription, Visitor, Remarks};

console.log(resolvers);
module.exports = resolvers;
