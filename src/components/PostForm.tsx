import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { useAuth } from "../context/AuthContext";
import YourInputComponent from "./YourInputComponent";


const PostForm: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

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
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
      <form onSubmit={handleSubmit}>
        <YourInputComponent/>
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
  );
};

export default PostForm;
