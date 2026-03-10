import { AppHeader } from '@/components/app-header/app-header'
import { LinkModule } from '@/components/linkModule/linkModule'
import {
  resetPassword,
  type ResetPasswordRequestBody,
} from '@/integration/resetPassword'
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [codeFromMail, setCodeFromMail] = useState('')

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === 'newPassword') {
      setNewPassword(value)
    } else if (name === 'codeFromMail') {
      setCodeFromMail(value)
    }
  }

  const onClickHandler = (): void => {
    const userUpdarams: ResetPasswordRequestBody = {
      token: codeFromMail,
      password: newPassword,
    }
    resetPassword(userUpdarams)
      .then((answer) => {
        alert(answer.message)
        void navigate('/login')
      })
      .catch((error) => {
        console.error('Ошибка сброса пароля:', error)
      })
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="newPassword"
          value={newPassword}
          onChange={onChangeHandler}
        />
        <Input
          type={'text'}
          placeholder="Введите код из письма"
          name="codeFromMail"
          value={codeFromMail}
          onChange={onChangeHandler}
        />
        <Button onClick={onClickHandler} size="medium" type="primary">
          Сохранить
        </Button>
        <LinkModule
          routePage={'/login'}
          text={'Вспомнили пароль?'}
          textLink={'Войти'}
        />
      </main>
    </>
  )
}
