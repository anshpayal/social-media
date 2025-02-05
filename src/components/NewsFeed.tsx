// import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_POSTS } from "../graphql/queries";

// const NewsFeed: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [offset, setOffset] = useState(0);
//   const limit = 10;

//   const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
//     variables: { limit, offset },
//     fetchPolicy: "cache-and-network",
//   });

//   useEffect(() => {
//     if (data) {
//       setPosts((prevPosts) => [...prevPosts, ...data.posts]);
//     }
//   }, [data]);

//   const loadMorePosts = () => {
//     fetchMore({
//       variables: { offset: posts.length },
//     });
//   };

//   if (loading && posts.length === 0) return <p>Loading...</p>;
//   if (error) return <p>Error loading posts</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">News Feed</h2>
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
//           <div className="flex items-center mb-2">
//             <img
//               src={post.user.photoURL || "https://via.placeholder.com/40"}
//               alt={post.user.displayName}
//               className="w-10 h-10 rounded-full mr-2"
//             />
//             <span className="font-semibold">{post.user.displayName}</span>
//           </div>
//           <p>{post.content}</p>
//           <small className="text-gray-500">
//             {new Date(post.created_at).toLocaleString()}
//           </small>
//         </div>
//       ))}
//       <button
//         onClick={loadMorePosts}
//         className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//       >
//         Load More
//       </button>
//     </div>
//   );
// };

// export default NewsFeed;
