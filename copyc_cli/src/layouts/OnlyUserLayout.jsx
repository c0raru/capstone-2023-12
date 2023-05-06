import { useEffect } from "react"
import { useUser } from "src/hooks/UserContext"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function OnlyUserLayout(props) {
    const user = useUser()
    const router = useRouter()
    useEffect(() => {
        if(user.userinfo.loading) {
            return
        }
        if(!user.userinfo.is_login) {
            console.log(user.userinfo)
            toast.error("로그인이 필요합니다.")
            router.push("/user/signin")
        }
    }, [user.userinfo])
    if(user.userinfo.loading || !user.userinfo.is_login) return <></>
    return <>
        {props.children}
    </>
}