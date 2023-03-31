import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SplitTextButton } from 'pages/button'
import { Button } from 'pages/button'
import { Input } from 'src/components/input'
import { Center } from 'src/components/styles'
import TitleSubtitleLayout from 'src/layouts/TitleSubtitleLayout'

export default function Signin() {
  const router = useRouter()
  return (
    <TitleSubtitleLayout title="로그인" subtitle="저작권 프리 사진 공유 플랫폼 카픽">
      <Input placeholder="아이디" />
      <Input placeholder="비밀번호" />
      <Button>로그인</Button>
      <SplitTextButton
        items = {[
          {
            "name": "아이디 찾기",
            "onClick": () => router.push("/user/find_username")
          },
          {
            "name": "비밀번호 찾기",
            "onClick": () => router.push("/user/find_password")
          }
        ]}
      />
      <Center>
        저작권 프리 사진 공유 플랫폼 카픽 <Link href="/user/signup">회원가입</Link>
      </Center>
    </TitleSubtitleLayout>
  )
}
