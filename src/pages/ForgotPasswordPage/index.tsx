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

  const onClickHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    forgotPasswordAndReset(email)
      .then(() => {
        console.log('BAM')
        localStorage.setItem('resetPasswordAllowed', 'true')
        void navigate('/reset-password')
      })
      .catch((error) => {
        console.error('Ошибка восстановления пароля:', error)
      })
  }

  return (
    <main className={styles.main}>
      <h2 className="text text_type_main-large">Восстановление пароля</h2>
      <form onSubmit={onClickHandler}>
        <EmailInput
          placeholder="E-mail"
          value={email}
          onChange={onChangeHandler}
          extraClass="mb-6"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" size="medium" type="primary">
            Восстановить
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
