import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ title, featuredImage, slug }) => {
  return (
    <Link to={`/post/${slug}`}>
      <div className="w-[300px] rounded-md border overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <img
          src={featuredImage}
          alt={title}
          className="h-[200px] w-full object-cover"
        />
        <div className="p-4 bg-[#fefdef]">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #post
            </span>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #mega blogs
            </span>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #memes and funny 
            </span>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-black px-2 py-2 text-sm font-semibold text-white hover:bg-black/80"
          >
            Read More
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
