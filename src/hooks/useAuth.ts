export const useAuth = (): boolean => {
  const isUserAuth =
    localStorage.getItem('accessToken') != '' &&
    localStorage.getItem('accessToken') != null &&
    localStorage.getItem('accessToken') != undefined
  return isUserAuth
}
