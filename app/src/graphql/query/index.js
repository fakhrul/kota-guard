import gql from "graphql-tag";

export const QUERY_POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      author {
        id
        handle
        avatar
      }
      comments {
        id
        body
        author {
          id
          avatar
          handle
        }
        createdAt
      }
      uri
      likes {
        author {
          id
          handle
          avatar
          name
        }
      }
      caption
      createdAt
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts($userId: String!) {
    posts(userId: $userId) {
      id
      uri
      caption
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      avatar
      name
      email
      about
      handle
      followers {
        id
        handle
        name
        avatar
      }
      following {
        id
        handle
        name
        avatar
      }
      posts {
        id
        caption
        uri
        createdAt
      }
      community {
        id
        name
        address
        city
        state
        postcode
        country
        logo
      }
    }
  }
`;

export const QUERY_SEARCH_USERS = gql`
  query SearchUsers($userId: String!, $name: String!) {
    searchUsers(userId: $userId, name: $name) {
      id
      avatar
      name
      handle
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExist($email: String!) {
    userExist(email: $email) {
      name
      id
      community {
        id
      }
    }
  }
`;

export const QUERY_LIKE_USERS = gql`
  query LikeUsers($likes: [String!]) {
    likeUsers(likes: $likes) {
      id
      avatar
      handle
      name
    }
  }
`;

export const QUERY_CHAT_EXISTS = gql`
  query ChatExists($userId: String!, $targetId: String!) {
    chatExists(userId: $userId, targetId: $targetId) {
      id
    }
  }
`;

export const QUERY_CHATS = gql`
  query Chats($userId: String!) {
    chats(userId: $userId) {
      id
      participants {
        id
        avatar
        handle
        lastSeen
      }
      messages(last: 1) {
        id
        body
        seen
        author {
          id
        }
        createdAt
      }
    }
  }
`;

export const QUERY_CHAT = gql`
  query Chat($chatId: String!) {
    chat(chatId: $chatId) {
      participants {
        id
      }
      messages(last: 40) {
        id
        body
        createdAt
        author {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const QUERY_USER_FEED = gql`
  query UserFeed($userId: String!) {
    userFeed(userId: $userId) {
      id
      uri
      caption
      createdAt
      author {
        id
        avatar
        handle
      }
      likes{
        author {
          id
          handle
          avatar
          name
        }
      }
    }
  }
`;

export const QUERY_DOES_FOLLOW = gql`
  query DoesFollow($userId: String!, $targetId: String!) {
    doesFollow(userId: $userId, targetId: $targetId) {
      id
    }
  }
`;

export const QUERY_USER_CONNECTIONS = gql`
  query UserConnections($userId: String!, $type: String!) {
    userConnections(userId: $userId, type: $type) {
      id
      avatar
      name
      handle
    }
  }
`;

export const QUERY_NOTIFICATION = gql`
  query Notifications($userId: String!) {
    notifications(userId: $userId) {
      id
      actionUser {
        id
        avatar
        handle
      }
      type
      resourceId
      createdAt
    }
  }
`;


export const QUERY_SEARCH_COMMUNITY = gql`
  query SearchCommunity($userId: String!, $name: String!) {
    searchCommunity(userId: $userId, name: $name) {
      id
      logo
      name
    }
  }
`;


export const QUERY_COMMUNITY = gql`
  query Community($id: String!) {
    community(id: $id) {
      id
      name
      address
      city
      state
      postcode
      country
      logo
      
      createdAt
      creator {
        id
        name
      }
    }
  }
`;

export const QUERY_SERVICE_BY_COMMUNITY = gql`
  query ServicesByCommunity($communityId: String!) {
    servicesByCommunity(communityId: $communityId) {
      id
      name
      amount
    }
  }
`


export const QUERY_SERVICE = gql`
  query Service($id: String!) {
    service(id: $id) {
      name
      description
      amount
      creator {
        name
      }
      createdAt
    }
  }
`;

// export const QUERY_PAYMENT_BY_SERVICE = gql`
//   query Payment($id: String)
// `;