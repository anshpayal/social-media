import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { offset: 0, limit: 10 },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data.postsCollection?.edges) {
      setPosts((prevPosts) => [
        ...prevPosts,
        ...data.postsCollection.edges.map((edge: any) => edge.node),
      ]);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMore({
            variables: { offset: posts.length },
          });
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, posts.length, fetchMore]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (error)
    return <p className="text-red-500">Error loading posts: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-semibold text-lg">
            {user?.displayName || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* News Feed */}
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">News Feed</h2>
        {posts.length === 0 && !loading && <p>No posts found.</p>}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <img
                src={post.avatar_url || "https://via.placeholder.com/40"}
                alt={post.username}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{post.username}</p>
                <small className="text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </small>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="w-full rounded-lg object-cover"
              />
            )}
          </div>
        ))}
        {loading && <p className="text-center">Loading more posts...</p>}
        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
};

export default Home;
