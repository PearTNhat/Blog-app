import Comment from "~/models/Comment";
import Post from "~/models/Post";

const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.desc = { $regex: filter, $options: "i" };
    }
    const query = Comment.find(where);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await Comment.find(where).countDocuments();
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    res.header({
      "x-filter": filter,
      "x-current-page": JSON.stringify(page),
      "x-pages-size": JSON.stringify(limit),
      "x-total-count": JSON.stringify(total),
      "x-total-page-count": JSON.stringify(pages),
    });
    if (page > pages || page < 1) {
      res.json([]);
    }
    let posts = await query
      .skip(skip)
      .limit(limit)
      .populate([
        { path: "user", select: "name avatar verified" },
        {
          path: "parentId",
          populate: [
            {
              path: "user",
              select: "name avatar verified",
            },
          ],
        },
        { path: "replyOnUser", select: "name avatar verified" },
        { path: "post", select: "slug title" },
      ])
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parentId, replyOnUser } = req.body;
    const post = await Post.findOne({ slug });
    if (!post) {
      let error = new Error("Post was not found");
      return next(error);
    }
    const comment = new Comment({
      desc,
      slug,
      parentId,
      replyOnUser,
      post: post._id,
      user: req.user._id,
    });
    const newComment = await comment.save();
    res.status(200).json({
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};
const updateComment = async (req, res, next) => {
  try {
    const { desc, check } = req.body;
    const newComment = await Comment.findById(req.params.commentId).populate(
      "user",
      "name avatar admin"
    );
    if (!newComment) {
      let error = new Error("Comment not found");
      return next(error);
    }
    if (newComment.user.admin && check !== undefined) {
      newComment.checked =
        typeof check !== "undefined" ? check : newComment.checked; // tranh truong hop check = undefined vi kh truyền check vào
      await newComment.save();
      return res.status(200).json({
        message: "Check updated successfully",
        data: newComment,
      });
    }
    if (newComment.user._id.toString() !== req.user._id.toString()) {
      let error = new Error("You are not authorized to update this comment");
      return next(error);
    }
    newComment.desc = desc || newComment.desc;
    await newComment.save();
    res.status(200).json({
      message: "Comment updated successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    let myComment = await Comment.findById(req.params.commentId).populate(
      "user",
      "name avatar"
    );
    if (!myComment) {
      let error = new Error("Comment not found");
      return next(error);
    }
    if (myComment.user._id.toString() !== req.user._id.toString()) {
      let error = new Error("You are not authorized to delete this comment");
      return next(error);
    }
    await Comment.deleteOne({ _id: req.params.commentId });
    await Comment.deleteMany({ parentId: myComment._id });
    res.status(200).json({
      message: "Comment updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { createComment, updateComment, deleteComment, getAllComments };
