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
import { Center } from "src/components/styles";
import { Label } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import styled from "styled-components";

const Page = styled(Center)`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 24px;
  >*:nth-child(2) {
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    color: #212121;
    margin-top: 14px;
    margin-bottom: 8px;
  }
  >*:nth-child(3) {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #616161;
  }
`


export default function SigninComplete() {
  const router = useRouter();
  return (
    <MainLayout>
      <Page>
        <div>🎉</div>
        <div>환영합니다!</div>
        <div>
          회원가입이 정상적으로 완료되었습니다.<br/>
          로그인 후 서비스를 이용해 주세요.
        </div>
      </Page>
      <div className="bottom">
        <Link href="/">
          <Button>메인으로</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
