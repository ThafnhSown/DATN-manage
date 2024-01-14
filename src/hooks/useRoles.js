import { useAppSelector } from "../redux/hook"

const useRoles = () => {
  const user = useAppSelector((state) => state.authState.userInfo)

  return user?.role || null
}

export default useRoles
