import React, { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expanded, setExpanded] = useState(Math.random() < 0.5);

  const handleToggle = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const details = () => {
    if (expanded) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
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
