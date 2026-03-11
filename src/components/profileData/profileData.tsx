import { userUpd } from '@/services/tasks/action'
import { getUserInfo, getUserInfoError } from '@/services/tasks/userInfoSlice'
import {
  Button,
  EmailInput,
  Input,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { UserRegistrationInfo } from '@/integration/userData'
import type React from 'react'

import stylesLocal from './profileData.module.css'

export const ProfileData = (): React.JSX.Element => {
  const userInfo = useSelector(getUserInfo)
  const [name, setName] = useState(userInfo?.name)
  const [email, setEmail] = useState(userInfo?.email)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const updError = useSelector(getUserInfoError)
  const userInfoOrig = userInfo

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

  const onClickUserUpdHandler = (): void => {
    const userUpdarams: UserRegistrationInfo = {
      name: name,
      email: email,
      password: password,
    }
    void dispatch(userUpd(userUpdarams))
  }

  const onClickCancelUserUpdHandler = (): void => {
    setName(userInfoOrig?.name)
    setEmail(userInfoOrig?.email)
  }

  return (
    <main className={stylesLocal.main}>
      <Input
        name="name"
        type={'text'}
        placeholder="Имя"
        icon="EditIcon"
        value={name}
        onChange={onChangeHandler}
      />
      <EmailInput
        name="email"
        value={email}
        onChange={onChangeHandler}
        icon="EditIcon"
      />
      <Input
        name="password"
        placeholder="Пароль"
        icon="EditIcon"
        value={password}
        onChange={onChangeHandler}
        errorText={updError}
      />
      {(userInfoOrig?.email !== email || userInfoOrig?.name !== name) && (
        <footer className={stylesLocal.footerContainer}>
          <Button onClick={onClickUserUpdHandler} size="medium" type="primary">
            Сохранить
          </Button>
          <Button
            onClick={onClickCancelUserUpdHandler}
            size="medium"
            type="primary"
          >
            Отмена
          </Button>
        </footer>
      )}
    </main>
  )
}
