import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";
import { useAuth } from "../context/AuthContext";
import { GET_POSTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const { data, loading, error } = useQuery(GET_POSTS);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    const imageUrl = image ? URL.createObjectURL(image) : null;

    try {
      await addPost({
        variables: {
          user_id: user?.uid,
          username: user?.displayName || "Anonymous",
          avatar_url: user?.photoURL || "https://via.placeholder.com/40",
          content,
          image_url: imageUrl,
        },
      });
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

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
          onClick={logout}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Post Form */}
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input type="file" onChange={handleImageChange} className="mb-4" />
          {image && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Post
          </button>
        </form>
      </div>

      {/* News Feed */}
      <div className="max-w-2xl mx-auto p-4">
        {loading && <p>Loading posts...</p>}
        {error && (
          <p className="text-red-500">Error loading posts: {error.message}</p>
        )}
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
    </div>
  );
};

export default Home;
