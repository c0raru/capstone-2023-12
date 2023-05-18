import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CheckButton } from "src/components/button";
import { CheckButtonGroup } from "src/components/button";
import { Button } from "src/components/button";
import { Datepicker } from "src/components/input";
import { Input } from "src/components/input";
import { Label } from "src/components/styles";
import TitleSubtitleLayout from "src/layouts/TitleSubtitleLayout";
import { toast } from 'react-toastify';
import { setCookie } from "src/utils/cookie";

export default function SigninAuth() {
  const router = useRouter();

  const [form, setForm] = useState({
    "fullname": "",
    "birthday": "",
    "gender": ""
  })

  const update = (name, value) => {
    form[name] = value
    setForm({...form})
  }

  const next = () => {
    if(!form.fullname) {
      toast.error("실명을 입력해주세요.")
      return
    }
    if(!form.birthday) {
      toast.error("생년월일을 입력해주세요.")
      return
    }
    if(!form.gender) {
      toast.error("성별을 입력해주세요.")
      return
    }
    setCookie("auth", form)
    router.push("/user/signup/form")
  }

  return (
    <TitleSubtitleLayout title="회원가입" subtitle="고객님에 대해 알려주세요">
      <div>
        <Label>실명</Label>
        <Input placeholder="홍길동" value={form.fullname} onChange={e => update("fullname", e.target.value)}/>
        <Label>생년월일</Label>
        <Datepicker
          placeholder="생년월일"
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          selected={form.birthday}
          onChange={value => update("birthday", value)}
        />
        <Label>성별</Label>
        <CheckButtonGroup>
          <CheckButton active={form.gender === "M"} onClick={() => update("gender", "M")}>남성</CheckButton>
          <CheckButton active={form.gender === "F"} onClick={() => update("gender", "F")}>여성</CheckButton>
        </CheckButtonGroup>
      </div>
      <div className="bottom">
        <Button onClick={next}>본인인증하고 계속하기</Button>
      </div>
    </TitleSubtitleLayout>
  );
}
