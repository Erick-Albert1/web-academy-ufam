import { useFavoriteProducts } from '@/app/hooks/useFavoriteProducts'
import { useFavoritesContext } from '@/app/hooks/useFavoritesContext'
import { useFavoritesTotalValue } from '@/app/hooks/useFavoritesTotalValue'
import { mockProducts } from '@/app/mocks/products'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoritesList from './FavoritesList'

jest.mock('../../hooks/useFavoriteProducts', () => ({
  useFavoriteProducts: jest.fn()
}))

jest.mock('../../hooks/useFavoritesTotalValue', () => ({
  useFavoritesTotalValue: jest.fn()
}))

jest.mock('../../hooks/useFavoritesContext', () => ({
  useFavoritesContext: jest.fn()
}))

const useFavoriteProductsMock = useFavoriteProducts as jest.Mock
const useFavoritesTotalValueMock = useFavoritesTotalValue as jest.Mock
const useFavoritesContextMock = useFavoritesContext as jest.Mock

describe('FavoritesList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the empty state message when there are no favorites', () => {
    useFavoriteProductsMock.mockReturnValue([])
    useFavoritesTotalValueMock.mockReturnValue(0)
    useFavoritesContextMock.mockReturnValue({ setFavorites: jest.fn() })

    render(<FavoritesList />)

    expect(
      screen.getByText('Sua lista de favoritos está vazia.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Quantidade de produtos: 0')).toBeInTheDocument()
    expect(screen.getByText('Valor total: R$ 0')).toBeInTheDocument()
  })

  it('should render a table row for each favorite product with its info', () => {
    const favorites = [mockProducts[0], mockProducts[1]]
    useFavoriteProductsMock.mockReturnValue(favorites)
    useFavoritesTotalValueMock.mockReturnValue(4022.15)
    useFavoritesContextMock.mockReturnValue({ setFavorites: jest.fn() })

    render(<FavoritesList />)

    expect(screen.queryByText('Sua lista de favoritos está vazia.')).not.toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(favorites.length + 1)

    const bodyRows = rows.slice(1)
    favorites.forEach((product, index) => {
      const row = within(bodyRows[index])
      expect(row.getByText(product.nome)).toBeInTheDocument()
      expect(row.getByText(product.descricao)).toBeInTheDocument()
      expect(row.getByText(`${product.desconto}%`)).toBeInTheDocument()
      expect(row.getByRole('button', { name: 'Remover' })).toBeInTheDocument()
    })
  })

  it('should reflect the quantity and total value returned by the hooks', () => {
    useFavoriteProductsMock.mockReturnValue([mockProducts[0]])
    useFavoritesTotalValueMock.mockReturnValue(1955)
    useFavoritesContextMock.mockReturnValue({ setFavorites: jest.fn() })

    render(<FavoritesList />)

    expect(screen.getByText('Quantidade de produtos: 1')).toBeInTheDocument()
    expect(screen.getByText('Valor total: R$ 1955')).toBeInTheDocument()
  })

  it('should call setFavorites removing the correct product when "Remover" is clicked', async () => {
    const favorites = [mockProducts[0], mockProducts[1]]
    const setFavorites = jest.fn()
    useFavoriteProductsMock.mockReturnValue(favorites)
    useFavoritesTotalValueMock.mockReturnValue(0)
    useFavoritesContextMock.mockReturnValue({ setFavorites })

    render(<FavoritesList />)

    const removeButtons = screen.getAllByRole('button', { name: 'Remover' })
    await userEvent.click(removeButtons[0])

    expect(setFavorites).toHaveBeenCalledTimes(1)

    const updaterFn = setFavorites.mock.calls[0][0]
    const result = updaterFn(favorites)
    expect(result).toEqual([mockProducts[1]])
  })
})
