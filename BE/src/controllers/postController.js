import { uploadPicture } from "~/middleware/uploadPictureMiddleware";
import { fileRemover } from "~/utils/fileRemover";
import Post from "~/models/Post";
import Comment from "~/models/Comment";
import { v4 as uuidv4 } from "uuid";
import {
  compareCategories,
  compareTwoArrays,
  compareTwoObjects,
} from "~/utils/compareInstance";
import PostCategories from "~/models/PostCategories";
const createPost = async (req, res, next) => {
  try {
    const newPost = new Post({
      user: req.user._id,
      title: req.body.title || "sample title",
      caption: "new caption",
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      slug: uuidv4(),
    });
    const createPost = await newPost.save();
    return res.status(200).json(createPost);
  } catch (error) {
    next(error);
  }
};
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      let error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }
    const handleData = (req, res, data) => {
      if (!data) {
        const error = Error("Please provide attributes for the post");
        throw error;
      }
      const { title, caption, body, tags, categories, slug } = JSON.parse(data);
      const compareTags = compareTwoArrays(post.tags, tags);
      const isCategoriesEqual = compareCategories(categories, post.categories);
      const compareBody = compareTwoObjects(post.body, body);
      if (
        compareBody &&
        post.photo === (req?.file?.filename || "") &&
        compareTags &&
        isCategoriesEqual &&
        post.title === title &&
        post.caption === caption &&
        post.slug === slug
      ) {
        return true;
      }
      return false;
    };
    const handleUpdatePost = (data) => {
      const { title, caption, body, tags, categories, slug } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      post.slug = slug || post.slug;
    };
    const upload = uploadPicture.single("postPicture");
    upload(req, res, async (err) => {
      if (err) {
        const error = new Error(
          "An Unknown error occurred when uploading" + " " + err.message
        );
        next(error);
      } else {
        // kiểm tra xem có thay đổi gì trong  và dữ liệu vào dedit post không
        try {
          const result = handleData(req, res, req.body.documents);
          if (result) {
            return res.status(202).json({
              message: "Nothing changed",
              data: post,
            });
          }
        } catch (error) {
          return next(error);
        }
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
        } else {
          let filename = post.photo;
          post.photo = "";
          if (filename) {
            fileRemover(filename);
          }
        }
      }
      handleUpdatePost(req.body.documents);
      const newPostUpdate = await post.save();
      res.status(200).json({
        message: "Post updated successfully",
        data: newPostUpdate,
      });
    });
  } catch (error) {
    next(error);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });
    if (!post) {
      let error = new Error("Post not found");
      return next(error);
    }
    if (post.photo !== "") {
      await fileRemover(post.photo);
    }
    await Post.deleteOne({ slug: req.params.slug });
    await Comment.deleteMany({ post: post._id });
    res.status(200).json({
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: "name avatar",
      },
      {
        path: "categories",
        select: "title",
      },
      {
        path: "comments",
        match: {
          checked: true,
          parentId: null,
        },
        populate: [
          {
            path: "user",
            select: "name avatar",
          },
          {
            // lay slug trong main comment
            path: "post",
            select: "slug",
          },
          {
            path: "replies",
            match: {
              checked: true,
            },
            populate: [
              {
                path: "user",
                select: "name avatar",
              },
              { path: "post", select: "slug" },
              {
                path: "replyOnUser",
                select: "name",
              },
            ],
          },
        ],
      },
    ]);
    if (!post) {
      let error = new Error("Post not found");
      return next(error);
    }
    res.status(200).json({
      message: "Get post successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
const getAllPosts = async (req, res, next) => {
  try {
    const titleCategory = req.query.category;
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    if (titleCategory) {
      const category = await PostCategories.findOne({ title: titleCategory });
      where.categories = category._id;
    }
    const query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Post.find(where).countDocuments();
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    res.header({
      "x-filter": encodeURIComponent(filter),
      "x-current-page": JSON.stringify(page),
      "x-pages-size": JSON.stringify(limit),
      "x-total-count": JSON.stringify(total),
      "x-total-page-count": JSON.stringify(pages),
    });
    if (page > pages || page < 1) {
      return res.json([]);
    }
    let posts = await query
      .skip(skip)
      .limit(limit)
      .populate([
        { path: "user", select: "name avatar verified" },
        { path: "categories", select: "title" },
      ])
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
export { createPost, updatePost, deletePost, getPost, getAllPosts };
