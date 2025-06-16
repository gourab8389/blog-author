import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { getBuffer } from "../utils/data-uri.js";
import { sql } from "../utils/db.js";
import { TryCatch } from "../utils/try-catch.js";
import cloudinary from "cloudinary";

export const createBlog = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { title, description, blogcontent, category } = req.body;

  const file = req.file;

  if (!file) {
    res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
    return;
  }

  const fileBuffer = getBuffer(file);

  if (!fileBuffer || !fileBuffer.content) {
    res.status(400).json({
      success: false,
      message: "Failed to generate file buffer",
    });
    return;
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "blogs",
  });

  const result = await sql`
    INSERT INTO blogs (title, description, blogcontent, category, image, author)
    VALUES (${title}, ${description}, ${blogcontent}, ${category}, ${cloud.secure_url}, ${req.user?._id})
    RETURNING *`;

  res.json({
    success: true,
    message: "Blog created successfully",
    blog: result[0],
  });
});

export const updateBlog = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { title, description, blogcontent, category } = req.body;
  const file = req.file;

  const blog = await sql`
        SELECT * FROM blogs WHERE id = ${id}
        `;

  if (!blog.length) {
    res.status(404).json({
      success: false,
      message: "No blog found with this id",
    });
    return;
  }

  if (blog[0].author !== req.user?._id) {
    res.status(401).json({
      success: false,
      message: "You are not authorized to update this blog",
    });
    return;
  }

  let imageUrl = blog[0].image;

  if (file) {
    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      res.status(400).json({
        success: false,
        message: "Failed to generate file buffer",
      });
      return;
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
      folder: "blogs",
    });

    imageUrl = cloud.secure_url;
  }

  const updatedBlog = await sql`
        UPDATE blogs
        SET title = ${title || blog[0].title},
            description = ${description || blog[0].description},
            blogcontent = ${blogcontent || blog[0].blogcontent},
            category = ${category || blog[0].category},
            image = ${imageUrl}
        WHERE id = ${id}
        RETURNING *
        `;

  res.json({
    success: true,
    message: "Blog updated successfully",
    blog: updatedBlog[0],
  });
});


export const deleteBlog = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;

  const blog = await sql`
        SELECT * FROM blogs WHERE id = ${id}
        `;

  if (!blog.length) {
    res.status(404).json({
      success: false,
      message: "No blog found with this id",
    });
    return;
  }

  if (blog[0].author !== req.user?._id) {
    res.status(401).json({
      success: false,
      message: "You are not authorized to delete this blog",
    });
    return;
  }

  await sql`DELETE FROM saveblogs WHERE blogid = ${id}`;
  await sql`DELETE FROM comments WHERE blogid = ${id}`;
  await sql`DELETE FROM blogs WHERE id = ${id}`;

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});
