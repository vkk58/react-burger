import { LinkModule } from '@/components/linkModule/linkModule'
import { useAppDispatch } from '@/hooks/socketHooks'
import { useAuth } from '@/hooks/useAuth'
import { userReg } from '@/services/tasks/action'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { UserRegistrationInfo } from '@/integration/userData'
import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const RegisterPage = (): React.JSX.Element => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isUserAuth = useAuth()

  useEffect(() => {
    if (isUserAuth.isUserAuth === true) {
      void navigate('/profile')
    }
  }, [isUserAuth, navigate])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'name') {
      setName(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const userRegParams: UserRegistrationInfo = {
      email: email,
      name: name,
      password: password,
    }
    void dispatch(userReg(userRegParams))
  }

  return (
    <main className={styles.main}>
      <h2 className="text text_type_main-large">Регистрация</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          type={'text'}
          placeholder="Имя"
          value={name}
          name={'name'}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <EmailInput
          value={email}
          name={'email'}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <PasswordInput
          icon="ShowIcon"
          name={'password'}
          value={password}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" size="medium" type="primary">
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <LinkModule
        text={'Уже зарегистрировались?'}
        textLink={'Войти'}
        routePage={'/login'}
      />
    </main>
  )
}
