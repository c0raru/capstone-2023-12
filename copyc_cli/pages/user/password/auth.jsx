/*
  @page        : /user/password/auth
  @description : 이메일 인증
*/
import Link from "next/link";
import { Button } from "src/components/button";
import { Input } from "src/components/input";
import { Label } from "src/components/styles";
import { NoticeText } from "src/components/styles";
import { Title } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import styled from "styled-components";

export default function UserPasswordAuth() {
  return (
    <MainLayout category="비밀번호 재설정">
      <section>
        <Title>이메일 인증</Title>
        <Label>이메일</Label>
        <Input disabled value="email@testemail.tld" />
        <NoticeText>
          - 회원가입시 입력한 이메일을 통해 메일이 전송됩니다.
        </NoticeText>
      </section>
      <section className="bottom">
        <Button>인증번호 전송</Button>
      </section>
    </MainLayout>
  );
}
