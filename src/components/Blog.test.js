import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders blog title and author without url or likes', () => {
  const blog = {
    title: 'Hello world',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
  }
  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => console.log('update blog')}
      deleteBlog={() => console.log('delete blog')}
    />
  )
  const blogDiv = component.container.querySelector('.blog')

  const blogUrl = component.container.querySelector('.blog-url')
  const blogLikes = component.container.querySelector('.blog-likes')

  expect(blogDiv).toHaveTextContent(blog.title)
  expect(blogDiv).toHaveTextContent(blog.author)
  expect(blogUrl).toBe(null)
  expect(blogLikes).toBe(null)
})

test('blog url and likes shown when button is clicked', () => {
  const blog = {
    title: 'Hello world',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
  }

  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => console.log('update blog')}
      deleteBlog={() => console.log('delete blog')}
    />
  )

  const blogToggle = component.container.querySelector('.blog-toggle')
  fireEvent.click(blogToggle)

  const blogUrl = component.container.querySelector('.blog-url')
  const blogLikes = component.container.querySelector('.blog-likes')

  expect(blogUrl).toHaveTextContent(blog.url)

  expect(blogLikes).toHaveTextContent(String(blog.likes))
})
