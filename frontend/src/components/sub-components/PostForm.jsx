import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Bgbutton, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { addPostService } from "../../services/addpost.services";
import { nanoid } from "@reduxjs/toolkit";
import { postUpdate } from "../../services/postUpdate.services";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/AuthSlice.js";

const PostForm = ({postTitle, postSlug, postContent, postStatus, postImage}) => {
  const dispatch = useDispatch();

  const selectOption = ["active", "inactive"];
  const [imagePreview, setImagePreview] = useState(postImage || "");

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: postTitle || "",
        slug: postSlug || "",
        content: postContent || "",
        status: postStatus || "active",
      },
    });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.status == "active" ? (data.status = true) : (data.status = false);

    if (!postSlug) {
      try {
        const createdPost = await addPostService(data);
        console.log(createdPost);

        if (createdPost) {
          navigate("/");
        } else {
          reset({
            title: null,
            slug: null,
            content: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatePostData = await postUpdate(postSlug, data);
        if (updatePostData) {
          console.log(updatePostData);
          dispatch(updatePost(updatePostData));
          navigate("/");
        }
      } catch (error) {
        console.log(`Went wrong when post found ${error}`);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      let slug = value.trim().toLowerCase().replace(/\s/g, "-");

      const uniqueId = nanoid(6); // Generates a 6-character unique ID
      slug = `${slug}-${uniqueId}`;
      return slug;
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap p-8 bg-white shadow-lg rounded-lg"
    >
      <div className="w-full lg:w-2/3 px-4">
        <Input
          placeholder="Title"
          className="mb-6"
          {...register("title", { required: true })}
        />

        {/* Hidden Slug Input */}
        <input type="hidden" {...register("slug", { required: true })} />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="mb-6"
        />
      </div>

      <div className="w-full lg:w-1/3 px-4">
        <Input
          type="file"
          className="mb-6"
          {...register("image", { required: !postImage })}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="w-96 h-96 mb-6">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
        <Select
          options={selectOption}
          label="Status"
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Bgbutton
          type="submit"
          textContent={postSlug ? "Save" : "Upload"}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default PostForm;
