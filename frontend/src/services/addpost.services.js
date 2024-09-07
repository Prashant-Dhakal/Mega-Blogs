import axios from "axios";

const addPostService = async (data) => {

    const formData = new FormData();

    // Append other fields to formData
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);

    // Append the file
    if (data.image && data.image[0].name) {
        formData.append("image", data.image[0]);  // Assuming you're only uploading one image
    }

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    const response = await axios.post("/user/addpost", formData, config);
    return response.data;
};

export { addPostService };
