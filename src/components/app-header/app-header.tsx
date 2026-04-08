import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from './app-header.module.css'

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    switch (location.pathname) {
      case '/profile':
      case '/profile/orders':
        setCurrentPage('profile')
        break
      case '/':
        setCurrentPage('home')
        break
      case '/feed':
        setCurrentPage('feed')
        break
      default:
        setCurrentPage('')
    }
  }, [location.pathname])

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            <Link to="/" className={`${styles.link} ${styles.link_active}`}>
              <BurgerIcon
                type={currentPage === 'home' ? 'primary' : 'secondary'}
              />
              <p
                className={`text text_type_main-default ml-2 ${
                  currentPage === 'home' ? '' : 'text_color_inactive'
                }`}
              >
                Конструктор
              </p>
            </Link>
            <Link to="/feed" className={`${styles.link} ml-10`}>
              <ListIcon
                type={currentPage === 'feed' ? 'primary' : 'secondary'}
              />
              <p
                className={`text text_type_main-default ml-2 ${
                  currentPage === 'feed' ? '' : 'text_color_inactive'
                }`}
              >
                Лента заказов
              </p>
            </Link>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <Link
            to="/profile"
            className={`${styles.link} ${styles.link_position_last}`}
          >
            <ProfileIcon
              type={currentPage === 'profile' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                currentPage === 'profile' ? '' : 'text_color_inactive'
              }`}
            >
              Личный кабинет
            </p>
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  )
}
