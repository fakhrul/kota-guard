import gql from "graphql-tag";

export const SUBSCRIPTION_CHAT = gql`
  subscription Chat($chatId: String!) {
    chat(chatId: $chatId) {
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

export const SUBSCRIPTION_POST = gql`
  subscription Post($id: String!) {
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

// Legacy
// export const SUBSCRIPTION_USER = gql`
//  subscription User($userId: String!) {
//     user(userId: $userId) {
//       id
//       avatar
//       name
//       handle
//       about
//       following {
//         id
//       }
//       followers {
//         id
//       }
//       posts {
//         id
//         uri
//       }
//     }
//   }
// `;
