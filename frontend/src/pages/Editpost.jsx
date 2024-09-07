import React from 'react'
import { PostForm } from '../components'
import { useSelector } from 'react-redux'

const Editpost = () => {

  const post = useSelector((state) => state.authentication.post);
  if(post){
    console.log(post);
  }
  
  return (
    <PostForm
      postTitle={post?.title}
      postSlug={post?.slug}
      postContent={post?.content}
      postStatus={post?.active}
      postImage={post?.image}
    />
  )
}

export default Editpost