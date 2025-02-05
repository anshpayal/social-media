import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
  postsCollection {
    edges {
      node {
        id
        user_id
        username
        avatar_url
        content
        image_url
        created_at
      }
    }
  }
}
`;