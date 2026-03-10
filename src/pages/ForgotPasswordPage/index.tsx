import { AppHeader } from '@/components/app-header/app-header'
import { LinkModule } from '@/components/linkModule/linkModule'
import { forgotPasswordAndReset } from '@/integration/forgotPasswordAndReset'
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type React from 'react'

import styles from '../../pagesCommonStyles/styles/styles.module.css'

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const [email, setEMail] = useState('')

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setEMail(value)
  }

  const onClickHandler = (): void => {
    forgotPasswordAndReset(email)
      .then((answer) => {
        alert(answer.message)
        void navigate('/login')
      })
      .catch((error) => {
        console.error('Ошибка восстановления пароля:', error)
      })
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <EmailInput
          placeholder="E-mail"
          value={email}
          onChange={onChangeHandler}
        />
        <Button onClick={onClickHandler} size="medium" type="primary">
          Восстановить
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
