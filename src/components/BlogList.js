import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  if (!blogs.length) {
    return <p>No blogs added</p>
  }
  return (
    <div id="blog-list">
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
