import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ProtectRoute({ children, isLogin }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    }, [])
    return isLogin ? children : null

}

export default ProtectRoute