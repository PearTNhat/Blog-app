import Post from "~/models/Post";
import PostCategories from "~/models/PostCategories";

const createCategory = async (req, res, next) => {
  try {
    let { title } = req.body;
    title = title.trim();
    const category = await PostCategories.findOne({ title });
    if (category) {
      let error = new Error("Category already exists");
      next(error);
      return;
    }
    const newCategory = new PostCategories({ title });
    const result = await newCategory.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const getAllCategories = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    const query = PostCategories.find(where);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = await PostCategories.find(where).countDocuments();
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
    let posts = await query.skip(skip).limit(limit).sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
const getSingleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await PostCategories.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title } = req.body;
    const category = await PostCategories.findOneAndUpdate(
      { _id: categoryId },
      { title },
      {
        new: true,
      }
    );
    if (!category) {
      let error = new Error("Category not found");
      next(error);
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await PostCategories.deleteOne({ _id: categoryId });
    await Post.updateOne(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
};
