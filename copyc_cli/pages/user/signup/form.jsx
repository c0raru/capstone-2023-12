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

const Warning = styled.div`
  margin-top: 5px;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #424242;
  .red {
    color: #FF0000;
  }
`

export default function SigninForm() {
  const router = useRouter();
  return (
    <TitleSubtitleLayout title="회원가입" subtitle="정보를 입력하고, 회원가입을 진행해 주세요">
      <div>
        <Label>아이디</Label>
        <Input placeholder="3~15자 영문/숫자 조합하여 입력" />
        <Label>비밀번호</Label>
        <Input placeholder="8~16자의 영문/숫자를 조합하여 입력" />
        <Label>비밀번호 확인</Label>
        <Input placeholder="비밀번호 확인" />
        <Label>이메일</Label>
        <Input placeholder="이메일" />
        <Warning>
          비밀번호 재설정 링크, 이벤트, 쿠폰에 대한 안내가 이메일로 제공됩니다.
          본인의 이메일을 정확하게 입력해주세요
          <br/>
          <div className="red">(가입 후 변경 불가능)</div>
        </Warning>
      </div>
      <div className="bottom">
        <Link href="/user/signup/complete">
          <Button>회원가입 완료</Button>
        </Link>
      </div>
    </TitleSubtitleLayout>
  );
}
