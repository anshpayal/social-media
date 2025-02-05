import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import PostForm from "./PostForm";

const NewsFeed: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <p className="text-red-700">Error loading posts: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <PostForm />
      
      <div className="space-y-6">
        {data?.postsCollection.edges.map((post: any) => (
          <div
            key={post.node.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={post.node.avatar_url || "https://via.placeholder.com/40"}
                  alt={post.node.username}
                  className="w-10 h-10 rounded-full border-2 border-gray-100"
                />
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">@{post.node.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.node.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-800 whitespace-pre-wrap">{post.node.content}</p>
              
              {post.node.image_url && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img
                    src={post.node.image_url}
                    alt="Post"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="mt-4 flex items-center space-x-4 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-indigo-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Like</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-indigo-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
