import { LinkModule } from '@/components/linkModule/linkModule'
import { useAuth } from '@/hooks/useAuth'
import { userReg } from '@/services/tasks/action'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { UserRegistrationInfo } from '@/integration/userData'
import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const RegisterPage = (): React.JSX.Element => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isUserAuth = useAuth()

  useEffect(() => {
    if (isUserAuth === true) {
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

  const onSubmitHandler = (e: React.FormEvent): void => {
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
      <Input
        type={'text'}
        placeholder="Имя"
        value={name}
        name={'name'}
        onChange={onChangeHandler}
      />
      <EmailInput value={email} name={'email'} onChange={onChangeHandler} />
      <PasswordInput
        icon="ShowIcon"
        name={'password'}
        value={password}
        onChange={onChangeHandler}
      />
      <Button onClick={onSubmitHandler} size="medium" type="primary">
        Зарегистрироваться
      </Button>
      <LinkModule
        text={'Уже зарегистрировались?'}
        textLink={'Войти'}
        routePage={'/login'}
      />
    </main>
  )
}
