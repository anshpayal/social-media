import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { useAuth } from "../context/AuthContext";
import YourInputComponent from "./YourInputComponent";
import { getCurrentUserData } from '../lib/firebase';


const PostForm: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userData = await getCurrentUserData(user.uid);
        if (userData) {
          setUsername(userData.username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    const imageUrl = image ? URL.createObjectURL(image) : null;
    const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg";

    try {
      await addPost({
        variables: {
          user_id: user?.uid,
          username: username || "user",
          avatar_url: user?.photoURL || defaultAvatar,
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <YourInputComponent
          content={content}
          setContent={setContent}
          className="w-full p-2 border rounded min-h-[100px]"
          placeholder="What's on your mind? Type @ to mention someone..."
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
  );
};

export default PostForm;
