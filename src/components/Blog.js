import React, { useState } from "react";
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const handleLike = (e) => {
    e.preventDefault();
    updateBlog(blog.id, { likes: blog.likes + 1 });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  const details = () => {
    if (expanded) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          <button onClick={handleDelete}>remove</button>
        </>
      );
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleToggle}>{expanded ? "hide" : "view"}</button>
        {details()}
      </div>
    </div>
  );
};

export default Blog;
