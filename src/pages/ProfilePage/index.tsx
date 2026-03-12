import { ProfileMenu } from '@/components/profileMenu/profileMenu'
import { Outlet } from 'react-router-dom'

import styles from './styles.module.css'

export const ProfilePage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ProfileMenu />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
