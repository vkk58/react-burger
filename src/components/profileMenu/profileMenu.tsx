import { clearUserData } from '@/services/tasks/userInfoSlice'
import {
  clearTokens,
  getUserRefreshToken,
} from '@/services/tasks/userTokensSlice'
import { Tab } from '@krgaa/react-developer-burger-ui-components'
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
        setSelectedTab('profile')
        void navigate('/profile/orders')
        break
      case 'exit':
        console.log('userRefreshToken', userRefreshToken)
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
    <div className={styles.main}>
      <nav>
        <ul>
          {tabArray.map((tab) => (
            <div key={tab.type}>
              <Tab
                key={tab.type}
                value={tab.type}
                active={selectTab === tab.type ? true : false}
                onClick={() => {
                  handleOnClick(tab.type)
                }}
              >
                {tab.name}
              </Tab>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  )
}
