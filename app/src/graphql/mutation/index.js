import gql from "graphql-tag";

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $avatar: String) {
    createUser(email: $email, name: $name, avatar: $avatar) {
      id
      avatar
      name
      email
    }
  }
`;

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost($authorId: String!, $uri: String, $caption: String) {
    createPost(authorId: $authorId, uri: $uri, caption: $caption) {
      id
    }
  }
`;

export const MUTATION_REPORT_POST = gql`
  mutation ReportPost($postId: String!) {
    reportPost(postId: $postId) {
      id
    }
  }
`;

export const MUTATION_EDIT_POST = gql`
  mutation EditPost($id: String!, $caption: String!) {
    editPost(id: $id, caption: $caption) {
      id
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const MUTATION_ADD_LIKE = gql`
  mutation AddLike($userId: String!, $postId: String!) {
    addLike(userId: $userId, postId: $postId) {
      id
    }
  }
`;


export const MUTATION_DELETE_LIKE = gql`
  mutation DeleteLike($userId: String!, $postId: String!) {
    deleteLike(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const MUTATION_ADD_COMMENT = gql`
  mutation AddComment($userId: String!, $postId: String!, $body: String!) {
    addComment(userId: $userId, postId: $postId, body: $body) {
      id
    }
  }
`;

export const MUTATION_DELETE_COMMENT = gql`
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export const MUTATION_BLOCK_USER = gql`
  mutation BlockUser($from: String!, $to: String!) {
    blockUser(from: $from, to: $to)
  }
`;

export const MUTATION_CREATE_TEMPORARY_CHAT = gql`
  mutation CreateTemporaryChat {
    createTemporaryChat {
      id
    }
  }
`;


export const MUTATION_CONNECT_CHAT_TO_USERS = gql`
  mutation ConnectChatToUsers($chatId: String!, $userId: String!, $targetId: String!) {
    connectChatToUsers(
      chatId: $chatId,
      userId: $userId,
      targetId: $targetId
    ) {
      id
    }
  }
`;


export const MUTATION_ADD_MESSAGE = gql`
  mutation AddChatMessage($chatId: String!, $authorId: String!, $body: String!) {
    addChatMessage(
      chatId: $chatId
      authorId: $authorId
      body: $body
    ) {
      messages {
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


export const MUTATION_DELETE_CHAT = gql`
  mutation DeleteChat($chatId: String!) {
    deleteChat(chatId: $chatId) {
      id
    }
  }
`;


export const MUTATION_SEEN_MESSAGE = gql`
  mutation MessageSeen($messageId: String!) {
    messageSeen(messageId: $messageId) {
      id
    }
  }
`;


export const MUTATION_LAST_SEEN = gql`
  mutation LastSeen($userId: String!) {
    updateLastSeen(userId: $userId) {
      chats {
        messages(last: 1) {
          author {
            id
          }
          seen
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_FOLLOWING = gql`
  mutation UpdateFollowing($userId: String!, $targetId: String!, $action: String!) {
    updateFollowing(
      userId: $userId
      targetId: $targetId
      action: $action
    ){
      id
    }
  }
`;

export const MUTATION_DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationId: String!) {
    deleteNotification(notificationId: $notificationId) {
      id
    }
  }
`;


export const MUTATION_UPDATE_FCM_TOKEN = gql`
  mutation UpdateFcmToken($userId: String!, $fcmToken: String!) {
    updateFcmToken(userId: $userId, fcmToken: $fcmToken) {
      id
    }
  }
`;

export const MUTATION_ADD_COMMUNITY = gql`
  mutation AddCommunity($userId: String!, $name: String!, $address: String, $city: String, $state: String, , $postcode: String, $country: String, $logo: String) {
    addCommunity(userId: $userId, name: $name, address: $address, city: $city, state: $state, postcode: $postcode, country: $country, logo: $logo) {
      id,
      name
    }
  }
`;


export const MUTATION_ADD_RESIDENT = gql`
  mutation AddResident($userId: String!, $residentId: String!, $communityId: String!) {
    addResident(userId: $userId, residentId: $residentId, communityId: $communityId) {
      id
    }
  }
`;
export const MUTATION_ADD_SERVICE = gql`
  mutation AddService($userId: String!, $communityId: String!, $name: String!, $amount: String!) {
    addService(userId: $userId, communityId: $communityId, name: $name, amount: $amount) {
      id
    }
  }
`;

