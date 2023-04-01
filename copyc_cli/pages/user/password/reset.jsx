/*
  @page        : /user/password/reset
  @description : 패스워드 변경 및 이메일 인증을 통한 패스워드 변경
                 로그인한 상태에서는 이메일 인증 없이 현재 비밀번호를 입력받아 본인임을 확인한다.
                 로그인하지 않은 상태에서는 이메일 인증을 받아 인증번호를 전송하고 본인임을 확인한다.
*/
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'

export default function UserPasswordReset() {
  return (
    <MainLayout category="비밀번호 재설정">
      <section>
      </section>
    </MainLayout>
  )
}
