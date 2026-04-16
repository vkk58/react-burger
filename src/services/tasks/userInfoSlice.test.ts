import { describe, it, expect } from 'vitest'

import { checkUserAuthThunk, userAuth, userReg, userUpd } from './action'
import userInfoReducer, {
  clearUserData,
  initialState,
  type UserInfoState,
} from './userInfoSlice'

const globalState = {
  userInfo: { email: 'tst@tst.ru', name: 'Test Test' },
  status: 'success',
  error: '',
} as UserInfoState

const thunks = [
  { thunk: userReg, testName: 'Регистрация', userInfoFromPayload: false },
  { thunk: userAuth, testName: 'Авторизация', userInfoFromPayload: false },
  { thunk: userUpd, testName: 'Обновление инфо', userInfoFromPayload: false },
  {
    thunk: checkUserAuthThunk,
    testName: 'Проверка авторизации пользователя',
    userInfoFromPayload: true,
  },
]

describe('Редьюсер пользовательской информации', () => {
  it('Получить начальное состояние', () => {
    const initState = userInfoReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual({
      userInfo: null,
      status: 'idle',
      error: '',
    })
  })

  thunks.forEach(({ thunk, testName, userInfoFromPayload }) => {
    describe(testName, () => {
      it('Pending', () => {
        const action = { type: thunk.pending.type }
        const state = userInfoReducer(initialState, action)

        expect(state.status).toBe('loading')
        expect(state.error).toBe('')
      })

      it('Fulfilled', () => {
        let payload = null
        if (userInfoFromPayload) {
          payload = globalState.userInfo
        } else {
          payload = { user: globalState.userInfo }
        }
        const action = {
          type: thunk.fulfilled.type,
          payload: payload,
        }
        const state = userInfoReducer(initialState, action)

        expect(state.status).toBe('success')
        expect(state.userInfo).toEqual({
          email: 'tst@tst.ru',
          name: 'Test Test',
        })
        expect(state.error).toBe('')
      })

      it('Rejected', () => {
        const action = {
          type: thunk.rejected.type,
          error: { message: 'Ошибка регистрации' },
        }
        const state = userInfoReducer(initialState, action)
        expect(state.status).toBe('error')
        expect(state.error).toBe('Ошибка регистрации')
      })
    })
  })

  it('Очистка редьюсера', () => {
    const action = clearUserData()
    const newState = userInfoReducer(globalState, action)

    expect(newState).toEqual({
      userInfo: null,
      status: 'idle',
      error: '',
    })
  })
})
