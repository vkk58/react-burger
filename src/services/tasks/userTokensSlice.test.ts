import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'

import { userAuth, userReg, userTokenRefresh } from './action'
import userTokenReducer, {
  clearTokens,
  type userTokensState,
} from './userTokensSlice'

type MockedStorage = Record<keyof Storage, Mock>

const localStorageMock = ((): MockedStorage => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

const initialState: userTokensState = {
  accessToken: (localStorageMock.getItem('accessToken') ?? '') as string,
  refreshToken: (localStorageMock.getItem('refreshToken') ?? '') as string,
  status: 'idle',
  error: '',
}

const thunks = [
  { thunk: userReg, testName: 'Регистрация' },
  { thunk: userAuth, testName: 'Авторизация' },
  { thunk: userTokenRefresh, testName: 'Обновление токена' },
]

describe('Редьюсер токенов', () => {
  it('Получить начальное состояние', () => {
    const initState = userTokenReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual(initialState)
  })

  thunks.forEach(({ thunk, testName }) => {
    describe(testName, () => {
      beforeEach(() => {
        localStorageMock.clear()
        vi.clearAllMocks()
        initialState.accessToken = ''
        initialState.refreshToken = ''
      })

      it('Pending', () => {
        const action = { type: thunk.pending.type }
        const state = userTokenReducer(initialState, action)

        expect(state.status).toBe('loading')
        expect(state.error).toBe('')
      })

      it('Fulfilled', () => {
        const payload = {
          accessToken: 'accessTokenValue',
          refreshToken: 'refreshTokenValue',
        }
        const action = {
          type: thunk.fulfilled.type,
          payload: payload,
        }
        const state = userTokenReducer(initialState, action)

        expect(state.status).toBe('success')
        expect(state.accessToken).toBe('accessTokenValue')
        expect(state.refreshToken).toBe('refreshTokenValue')
        expect(localStorageMock.getItem('accessToken')).toBe('accessTokenValue')
        expect(localStorageMock.getItem('refreshToken')).toBe(
          'refreshTokenValue'
        )
      })

      it('Rejected', () => {
        const action = {
          type: thunk.rejected.type,
          error: { message: 'Ошибка регистрации' },
        }
        const state = userTokenReducer(initialState, action)
        expect(state.status).toBe('error')
        expect(state.error).toBe('Ошибка регистрации')
      })
    })
  })

  it('Очистка редьюсера', () => {
    const action = clearTokens()
    const newState = userTokenReducer(initialState, action)

    expect(newState).toEqual({
      accessToken: '',
      refreshToken: '',
      status: 'idle',
      error: '',
    })
  })
})
