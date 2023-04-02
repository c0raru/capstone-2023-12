import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckButton } from "src/components/button";
import { CheckButtonGroup } from "src/components/button";
import { SplitTextButton } from "src/components/button";
import { Button } from "src/components/button";
import { Datepicker } from "src/components/input";
import { Input } from "src/components/input";
import { Label } from "src/components/styles";
import TitleSubtitleLayout from "src/layouts/TitleSubtitleLayout";
import styled from "styled-components";

export default function SigninAuth() {
  const router = useRouter();
  return (
    <TitleSubtitleLayout title="회원가입" subtitle="고객님에 대해 알려주세요">
      <div>
        <Label>실명</Label>
        <Input placeholder="홍길동" />
        <Label>생년월일</Label>
        <Datepicker
          placeholder="생년월일"
          dateFormat="yyyy/MM/dd"
          showMonthDropdown
          showYearDropdown
        />
        <Label>성별</Label>
        <CheckButtonGroup>
          <CheckButton active={true}>남성</CheckButton>
          <CheckButton>여성</CheckButton>
        </CheckButtonGroup>
      </div>
      <div className="bottom">
        <Link href="/user/signup/form">
          <Button>본인인증하고 계속하기</Button>
        </Link>
      </div>
    </TitleSubtitleLayout>
  );
}
