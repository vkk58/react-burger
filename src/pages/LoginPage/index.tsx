import { LinkModule } from '@/components/linkModule/linkModule'
import { useAppDispatch, useAppSelector } from '@/hooks/socketHooks'
import { userAuth } from '@/services/tasks/action'
import { getUserInfoError } from '@/services/tasks/userInfoSlice'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'

import type { UserAuthData } from '@/integration/userData'
import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authError = useAppSelector(getUserInfoError)
  const dispatch = useAppDispatch()

  const onClickUserAuthHandler = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault()
    const userAuthParams: UserAuthData = { email: email, password: password }
    void dispatch(userAuth(userAuthParams))
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <>
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Вход</h2>
        <form onSubmit={onClickUserAuthHandler}>
          <EmailInput
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={onChangeHandler}
            extraClass="mb-6"
          />
          <PasswordInput
            icon="ShowIcon"
            name="password"
            onChange={onChangeHandler}
            value={password}
            extraClass="mb-6"
          />
          {authError && authError !== 'Rejected' && (
            <div
              className="text text_type_main-default text_color_inactive"
              style={{ color: 'red' }}
            >
              {authError}
            </div>
          )}
          <div className={styles.buttonWrapper}>
            <Button htmlType="submit" size="medium" type="primary">
              Войти
            </Button>
          </div>
        </form>
        <LinkModule
          routePage={'/register'}
          text={'Вы - новый пользователь?'}
          textLink={'Зарегистрироваться'}
        />
        <LinkModule
          routePage={'/forgot-password'}
          text={'Забыли пароль?'}
          textLink={'Восстановить пароль'}
        />
      </main>
    </>
  )
}
