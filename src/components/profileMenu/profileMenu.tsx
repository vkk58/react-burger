import { clearUserData } from '@/services/tasks/userInfoSlice'
import {
  clearTokens,
  getUserRefreshToken,
} from '@/services/tasks/userTokensSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutUser } from '../../integration/userData'

import styles from './profileMenu.module.css'

type TabsValue = {
  type: string
  name: string
}

const tabArray: TabsValue[] = [
  { type: 'profile', name: 'Профиль' },
  { type: 'orderHistory', name: 'История заказов' },
  { type: 'exit', name: 'Выход' },
]

export const ProfileMenu = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const [selectTab, setSelectedTab] = useState('profile')
  const navigate = useNavigate()
  const userRefreshToken = useSelector(getUserRefreshToken)

  const handleOnClick = (type: string): void => {
    switch (type) {
      case 'profile':
        setSelectedTab('profile')
        void navigate('/profile')
        break
      case 'orderHistory':
        setSelectedTab('orderHistory')
        void navigate('/profile/orders')
        break
      case 'exit':
        if (userRefreshToken)
          logoutUser(userRefreshToken)
            .then(() => {
              dispatch(clearUserData())
              dispatch(clearTokens())
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
            })
            .catch((error) => console.log('Ошибка при выходе:', error))
        else {
          console.log('refresh token error')
        }
        void navigate('/')
        break
    }
  }

  return (
    <>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          {tabArray.map((tab) => (
            <li key={tab.type}>
              <button
                className={`${styles.link} text text_type_main-medium ${selectTab === tab.type ? styles.active : ''}`}
                onClick={() => handleOnClick(tab.type)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </>
  )
}
