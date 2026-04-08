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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [codeFromMail, setCodeFromMail] = useState('')

  useEffect(() => {
    const isAllowed = localStorage.getItem('resetPasswordAllowed')
    console.log('isAllowed', isAllowed)
    if (isAllowed !== 'true') {
      void navigate('/login', { replace: true })
    }
  }, [navigate])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === 'newPassword') {
      setNewPassword(value)
    } else if (name === 'codeFromMail') {
      setCodeFromMail(value)
    }
  }

  const onClickHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const userUpdarams: ResetPasswordRequestBody = {
      token: codeFromMail,
      password: newPassword,
    }
    resetPassword(userUpdarams)
      .then((answer) => {
        alert(answer.message)

        localStorage.removeItem('resetPasswordAllowed')
        void navigate('/login')
      })
      .catch((error) => {
        console.error('Ошибка сброса пароля:', error)
      })
  }

  return (
    <main className={styles.main}>
      <h2 className="text text_type_main-large">Восстановление пароля</h2>
      <form onSubmit={onClickHandler}>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="newPassword"
          value={newPassword}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder="Введите код из письма"
          name="codeFromMail"
          value={codeFromMail}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" size="medium" type="primary">
            Сохранить
          </Button>
        </div>
      </form>
      <LinkModule
        routePage={'/login'}
        text={'Вспомнили пароль?'}
        textLink={'Войти'}
      />
    </main>
  )
}
