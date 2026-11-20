import useUserContext from "../contexts/UserContext"


export default function LogOut() {
    const { logout } = useUserContext()

    return (
        <button onClick={logout}>Logout</button>
    )
}