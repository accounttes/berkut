import { render, screen } from '@testing-library/react'
import { FavoriteProvider, useFavorites } from '../context/FavoriteContext'
import { Photo } from '../types'
import userEvent from '@testing-library/user-event'

function TestComponent({ photo }: { photo: Photo }) {
  const { favorites, toggleFavorite } = useFavorites()
  return (
    <div>
      <button onClick={() => toggleFavorite(photo)}>toggle</button>
      <span data-testid="count">{favorites.length}</span>
    </div>
  )
}

describe('FavoriteContext', () => {
  it('adds and removes photo', async () => {
    const dummy: Photo = {
      id: '1',
      alt_description: null,
      urls: { small: 's', regular: 'r', full: 'f' },
      user: { name: 'u' }
    }
    render(
      <FavoriteProvider>
        <TestComponent photo={dummy} />
      </FavoriteProvider>
    )
    const btn = screen.getByRole('button')
    const count = screen.getByTestId('count')
    expect(count.textContent).toBe('0')
    await userEvent.click(btn)
    expect(count.textContent).toBe('1')
    await userEvent.click(btn)
    expect(count.textContent).toBe('0')
  })
}) 