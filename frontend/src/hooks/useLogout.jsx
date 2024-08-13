import { resetSchedule } from '../redux/schedule'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatch(resetSchedule());
  }

  return { logout }
}