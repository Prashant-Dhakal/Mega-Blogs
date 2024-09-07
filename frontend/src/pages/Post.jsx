import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSinglePost } from "../services/getSinglePost.services.js";
import { useDispatch } from 'react-redux';
import { setPosts } from "../store/AuthSlice.js";
import { deletePostService } from "../services/deletePost.services.js";
import { clearPost } from "../store/AuthSlice.js";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getSinglePost(slug);
        if (response) {
          setPost(response);
          dispatch(setPosts(response));
        }
      } catch (err) {
        setError('Could not fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const deletePost = async (slug) => {
    try {
      const deletePost = await deletePostService(slug);
      if (deletePostService) {
        dispatch(clearPost());
        navigate('/');
        return deletePost;
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="overflow-hidden">
      <div className="relative h-screen">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover brightness-75"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-24">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5 bg-black/50 p-6 rounded-lg shadow-lg">
            <div className="w-full lg:w-1/2 lg:pl-10">
              <h2 className="text-sm font-semibold tracking-widest text-gray-400">{post.author}</h2>
              <h1 className="my-4 text-4xl font-bold text-white">{post.title}</h1>
              <div
                className="my-4 text-yellow-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="my-4 flex items-center">
                <span className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l6.354 3.334-1.215-7.08 5.146-5.017-7.134-1.037L12 .75l-3.15 6.4-7.134 1.037 5.146 5.017-1.215 7.08L12 17.25z" />
                    </svg>
                  ))}
                  <span className="ml-3 inline-block text-xs font-semibold text-gray-300">
                    4 Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed text-gray-300">{post.body}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="title-font text-xl font-bold text-white">₹{post.price}</span>
                <div className="space-x-3">
                  <Link to={`/post/updation/${slug}`}>
                    <button
                      type="button"
                      className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/80"
                    >
                      Edit Post
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePost(slug)}
                    type="button"
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80"
                  >
                    Delete Post
                  </button>
                  <Link
                    to="/"
                    className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700/80"
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Post };
