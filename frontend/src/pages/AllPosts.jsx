import React, { useEffect, useState } from "react";
import { PostCard } from "../components/index.js";
import { getAllpostServices } from "../services/getAllpost.services.js";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllposts = async () => {
      try {
        const getallpost = await getAllpostServices();
        if (getallpost) {
          setPosts(getallpost.data);
        }
      } catch (error) {
        console.log(
          "Error occured in AllPosts.jsx in getAllpost Function",
          error
        );
      }
    };

    getAllposts();
  }, []);

  return (
    <>
      <div className="w-full h-full py-8">
        {posts.map((post) => {
          return (
            <div key={post._id} className="w-full h-full">
              <PostCard
                slug={post?.slug}
                title={post?.title}
                featuredImage={post?.image}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllPosts;
