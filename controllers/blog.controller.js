import BlogPost from "../models/BlogPost.js";
import mongoose from "mongoose";

export const getBlog = async (req, res) => {
  const {id} = req.params;
  try {
    const blog = await BlogPost.findById(id);
    res.status(200).json(blog)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const getBlogs = async (req, res) => {
  const {page} = req.query;
  try {
    const LIMIT= 6
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await BlogPost.countDocuments({});
    const posts = await BlogPost.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
    // console.log(blogPosts);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const data = req.body;
  const newBlog = new BlogPost({...data, author: req.userId, createdAt: new Date().toISOString()});
  try {
    await newBlog.save();
    res.status(201).json({ newBlog });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await BlogPost.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  console.log(req.userId)
  if(!req.userId) return res.json({message:'Unauthenticated'});
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await BlogPost.findById(id)
  console.log(post)
  const index = post.likes.findIndex((id)=>id === String(req.userId))
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await BlogPost.findByIdAndUpdate(
    id,
    post,
    { new: true }
  );
  res.json(updatedPost)
};
