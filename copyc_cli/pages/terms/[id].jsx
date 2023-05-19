/*
  @page        : /terms/[id]
  @description : 회원 약괸을 서버에서 불러와서 전시
*/
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { CardItems } from "src/components/card";
import { Card } from "src/components/card";
import MainLayout from "src/layouts/MainLayout";
import styled from "styled-components";
import axios from 'axios';

export default function Terms() {
  const router = useRouter()
  const [form, setForm] = useState({
      "name": "",
      "contents": ""
  });
  useEffect(() => {
    if(!router.isReady) return
    axios.get("terms/" + router.query.id).then(({data}) => {
        setForm(data)
    }).catch(() => {
        router.push("/404")
    })
  }, [router.isReady, router.query])

  if(!form.name) return <></>
  return (
    <MainLayout category={form.name} removeMenu white>
      <section dangerouslySetInnerHTML={{__html: form.contents}}>
      </section>
    </MainLayout>
  );
}
