/*
  @page        : /user/password/reset
  @description : 패스워드 변경 및 이메일 인증을 통한 패스워드 변경
                 로그인한 상태에서는 이메일 인증 없이 현재 비밀번호를 입력받아 본인임을 확인한다.
                 로그인하지 않은 상태에서는 이메일 인증을 받아 인증번호를 전송하고 본인임을 확인한다.
*/
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'src/components/button'
import { Input } from 'src/components/input'
import { NoticeText } from 'src/components/styles'
import { Label } from 'src/components/styles'
import { Title } from 'src/components/styles'
import { useUser } from 'src/hooks/UserContext'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'
import { responseMessage } from 'utils'

export default function UserPasswordReset() {
  const user = useUser()
  const router = useRouter()

  const [form, setForm] = useState({
    "password": "",
    "password_new": "",
    "password_check": "",
  })

  const update = (name, value) => {
    form[name] = value
    setForm({...form})
  }

  const changePassword = () => {
    if(form.password_new != form.password_check) {
      toast.error("두 비밀번호가 서로 같지 않습니다.")
      return
    }
    responseMessage(user.changePassword(form))
    .then(() => {
      toast.success("비밀번호가 변경되었습니다.")
      router.push("/user/signin")
    })
  }

  return (
    <MainLayout category="새 비밀번호 입력">
      <section>
        <Title>이메일 인증</Title>
        <Label>기존 비밀번호</Label>
        <Input value={form.password} type="password" onChange={e => update("password", e.target.value)} placeholder="기존 비밀번호를 입력해주세요." />
        <Label>새로운 비밀번호</Label>
        <Input value={form.password_new} type="password" onChange={e => update("password_new", e.target.value)} placeholder="8~16자의 영문/숫자를 조합하여 입력해주세요." />
        <Label>비밀번호 확인</Label>
        <Input value={form.password_check} type="password" onChange={e => update("password_check", e.target.value)} placeholder="비밀번호 확인" />
      </section>
      <section className="bottom">
        <Button onClick={changePassword}>비밀번호 변경</Button>
      </section>
    </MainLayout>
  )
}
