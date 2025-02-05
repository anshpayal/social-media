import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";

const NewsFeed: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error)
    return <p className="text-red-500">Error loading posts: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {data?.postsCollection.edges.map((post: any) => (
        <div
          key={post.node.id}
          className="bg-white p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <img
              src={post.node.avatar_url || "https://via.placeholder.com/40"}
              alt={post.node.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{post.node.username}</p>
              <small className="text-gray-500">
                {new Date(post.node.created_at).toLocaleString()}
              </small>
            </div>
          </div>
          <p className="mb-4">{post.node.content}</p>
          {post.node.image_url && (
            <img
              src={post.node.image_url}
              alt="Post"
              className="w-full rounded-lg object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
