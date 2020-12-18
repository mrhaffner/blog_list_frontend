
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      user: { name: 'name' }
    }
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={null} updateLikes={mockHandler}/>
    )
  })

  test('Renders title and author by default', () => {
    const title = component.getByText('title author')
    expect(title).toBeDefined()
  })

  test('Does not render url and likes by default', () => {
    const toggleDiv = component.container.querySelector('.toggleDiv')
    expect(toggleDiv).toHaveStyle('display: none')
  })

  test('Renders url and likes when button has been pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const toggleDiv = component.container.querySelector('.toggleDiv')
    expect(toggleDiv).not.toHaveStyle('display: none')
  })

  test('If the like button is clicked twice, the event handler is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})