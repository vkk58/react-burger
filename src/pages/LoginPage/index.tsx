import { AppHeader } from '@/components/app-header/app-header'
import { LinkModule } from '@/components/linkModule/linkModule'
import { userAuth } from '@/services/tasks/action'
import {
  getUserInfoError,
  getUserInfoStatus,
} from '@/services/tasks/userInfoSlice'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { UserAuthData } from '@/integration/userData'
import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authStatus = useSelector(getUserInfoStatus)
  const authError = useSelector(getUserInfoError)
  const dispatch = useDispatch()

  const onClickUserAuthHandler = (): void => {
    console.log('click sdfsdf', authStatus, authError)
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
      <AppHeader />
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Вход</h2>
        <EmailInput
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />
        <PasswordInput
          icon="ShowIcon"
          name="password"
          onChange={onChangeHandler}
          value={password}
        />
        {authError && (
          <div
            className="text text_type_main-default text_color_inactive"
            style={{ color: 'red' }}
          >
            {authError}
          </div>
        )}
        <Button onClick={onClickUserAuthHandler} size="medium" type="primary">
          Войти
        </Button>
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
