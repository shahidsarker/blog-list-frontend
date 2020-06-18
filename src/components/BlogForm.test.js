import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('calls event handler from props with right details when new blog is called', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const sampleTitle = 'Hello world'
  const sampleAuthor = 'John'
  const sampleUrl = 'http://example.com/'

  const title = component.container.querySelector('#title')
  fireEvent.change(title, { target: { value: sampleTitle } })
  const author = component.container.querySelector('#author')

  fireEvent.change(author, { target: { value: sampleAuthor } })
  const url = component.container.querySelector('#url')

  fireEvent.change(url, { target: { value: sampleUrl } })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toEqual(sampleTitle)
  expect(createBlog.mock.calls[0][0].author).toEqual(sampleAuthor)
  expect(createBlog.mock.calls[0][0].url).toEqual(sampleUrl)
})
