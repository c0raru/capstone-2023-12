import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SplitTextButton } from "src/components/button";
import { Button } from "src/components/button";
import { Input } from "src/components/input";
import { Center } from "src/components/styles";
import { useUser } from "src/hooks/UserContext";
import TitleSubtitleLayout from "src/layouts/TitleSubtitleLayout";
import { responseMessage } from "utils";

export default function Signin() {
  const router = useRouter();
  const user = useUser();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const update = (name, value) => {
    form[name] = value;
    setForm({ ...form });
  };
  const login = () => {
    responseMessage(user.login(form))
    .then(({ data }) => {
      router.push("/")
    });
  };
  return (
    <TitleSubtitleLayout
      title="로그인"
      subtitle="저작권 프리 사진공유 사이트 카픽"
    >
      <Input
        placeholder="아이디"
        value={form.username}
        onChange={(e) => update("username", e.target.value)}
      />
      <Input
        placeholder="비밀번호"
        type="password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
      />
      <Button onClick={login}>로그인</Button>
      <SplitTextButton
        items={[
          {
            name: "아이디 찾기",
            onClick: () => router.push("/user/find_username"),
          },
          {
            name: "비밀번호 찾기",
            onClick: () => router.push("/user/find_password"),
          },
        ]}
      />
      <Center>
        카픽에서 사진공유를 해보세요{" "}
        <Link href="/user/signup">회원가입</Link>
      </Center>
    </TitleSubtitleLayout>
  );
}
