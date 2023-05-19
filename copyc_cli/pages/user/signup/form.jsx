import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "src/components/button";
import { Input } from "src/components/input";
import { Label } from "src/components/styles";
import TitleSubtitleLayout from "src/layouts/TitleSubtitleLayout";
import styled from "styled-components";
import axios from 'axios';
import { toast } from 'react-toastify';
import { responseMessage } from "utils";
import { getCookie } from "src/utils/cookie";

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

  const [form, setForm] = useState({
    "username": "",
    "password": "",
    "password_check": "",
    "email": "",
  })

  const update = (name, value) => {
    form[name] = value
    setForm({...form})
  }

  const next = () => {
    if(!form.email) {
      toast.error("이메일을 입력해주세요.")
      return
    }
    if(!form.username) {
      toast.error("아이디를 입력해주세요.")
      return
    }
    if(!form.password) {
      toast.error("비밀번호를 입력해주세요.")
      return
    }
    if(form.password !== form.password_check) {
      toast.error("두 비밀번호가 서로 다릅니다.")
      return
    }
    const terms = getCookie("terms")
    const auth = getCookie("auth")
    const data = {...{terms: terms}, ...auth, ...form}
    responseMessage(axios.put("user/", data))
    .then(({data}) => {
      router.push("/user/signup/complete")
    })
  }

  return (
    <TitleSubtitleLayout title="회원가입" subtitle="정보를 입력하고, 회원가입을 진행해 주세요">
      <div>
        <Label>아이디</Label>
        <Input placeholder="3~15자 영문/숫자 조합하여 입력" value={form.username} onChange={e => update("username", e.target.value)} />
        <Label>비밀번호</Label>
        <Input type="password" placeholder="8~16자의 영문/숫자를 조합하여 입력" value={form.password} onChange={e => update("password", e.target.value)} />
        <Label>비밀번호 확인</Label>
        <Input type="password" placeholder="비밀번호 확인" value={form.password_check} onChange={e => update("password_check", e.target.value)} />
        <Label>이메일</Label>
        <Input placeholder="이메일" value={form.email} onChange={e => update("email", e.target.value)} />
        <Warning>
          비밀번호 재설정 링크, 이벤트, 쿠폰에 대한 안내가 이메일로 제공됩니다.
          본인의 이메일을 정확하게 입력해주세요
          <br/>
          <div className="red">(가입 후 변경 불가능)</div>
        </Warning>
      </div>
      <div className="bottom">
        <Button onClick={next}>회원가입 완료</Button>
      </div>
    </TitleSubtitleLayout>
  );
}
