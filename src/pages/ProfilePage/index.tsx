import { AppHeader } from '@/components/app-header/app-header'
import { ProfileMenu } from '@/components/profileMenu/profileMenu'
import { Outlet } from 'react-router-dom'

import type React from 'react'

export const ProfilePage = (): React.JSX.Element => {
  return (
    <>
      <AppHeader />
      <ProfileMenu />
      <Outlet />
    </>
  )
}
