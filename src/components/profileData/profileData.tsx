import { userUpd } from '@/services/tasks/action'
import {
  getUserInfo,
  getUserInfoError,
  getUserInfoStatus,
} from '@/services/tasks/userInfoSlice'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { UserRegistrationInfo } from '@/integration/userData'
import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const ProfileData = (): React.JSX.Element => {
  const [errorText, setErrorText] = useState('')
  const userInfo = useSelector(getUserInfo)
  const [name, setName] = useState(userInfo?.name)
  const [email, setEmail] = useState(userInfo?.email)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const updStatus = useSelector(getUserInfoStatus)
  const updError = useSelector(getUserInfoError)
  /*
  useEffect(() => {
    if (isUserAuth === false) {
      void navigate('/login')
    }
  }, [isUserAuth, navigate])
*/
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

  useEffect(() => {
    if (updStatus === 'success') {
      void navigate('/profile')
    } else if (updStatus === 'error') {
      setErrorText(updError)
    }
  }, [updStatus, updError])

  return (
    <main className={styles.main}>
      <Input
        type={'text'}
        placeholder="Имя"
        value={name}
        onChange={onChangeHandler}
      />
      <EmailInput value={email} onChange={onChangeHandler} />
      <PasswordInput
        icon="ShowIcon"
        value={password}
        onChange={onChangeHandler}
        errorText={errorText}
      />
      <Button onClick={onClickUserUpdHandler} size="medium" type="primary">
        Обновить
      </Button>
    </main>
  )
}
