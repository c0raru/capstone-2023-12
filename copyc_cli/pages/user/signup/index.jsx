import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from 'src/components/button'
import { MultiCheckbox } from 'src/components/input'
import TitleSubtitleLayout from 'src/layouts/TitleSubtitleLayout'
import { toast } from 'react-toastify';
import { setCookie } from 'src/utils/cookie'

export default function Signin() {
  const router = useRouter()
  const [options, setOptions] = useState([
    {
      "text": "개인정보이용약관(필수)",
      "url": "/terms/privacy",
      "is_active": false
    },
    {
      "text": "이용약관(필수)",
      "url": "/terms/user",
      "is_active": false
    },
  ])
  const onClickHandler = (id) => {
    options[id].is_active = !options[id].is_active
    setOptions([...options])
  }
  const next = () => {
    if(options[0].is_active === false) {
      toast.error("개인정보이용약관은 필수로 동의해주셔야합니다.")
      return
    }
    if(options[1].is_active === false) {
      toast.error("이용약관은 필수로 동의해주셔야합니다.")
      return
    }
    setCookie("terms", options)
    router.push("/user/signup/auth")
  }
  return (
    <TitleSubtitleLayout title="이용약관" subtitle="카픽의 약관내용에 동의해주세요">
      <MultiCheckbox
        options={options}
        onClick={onClickHandler}
      />
      <div className="bottom">
        <Button onClick={next}>동의</Button>
      </div>
    </TitleSubtitleLayout>
  )
}
