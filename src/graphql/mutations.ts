import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($user_id: String!, $username: String!, $avatar_url: String!, $content: String!, $image_url: String) {
    insertIntopostsCollection(
      objects: {
        user_id: $user_id,
        username: $username,
        avatar_url: $avatar_url,
        content: $content,
        image_url: $image_url
      }
    ) {
      records {
        id
        content
        image_url
        created_at
      }
      affectedCount
    }
  }
`;