/*
  @page        : /styles/request
  @description : 스타일 추천 설문조사 진행
*/
import Link from "next/link";
import { Button } from "src/components/button";
import MainLayout from "src/layouts/MainLayout";
import StyleLayout from "src/layouts/StyleLayout";
import styled, { css } from "styled-components";
import { Center } from "src/components/styles";
import { CardItems } from "src/components/card";

const Page = styled.div`
`;

export default function StylesComplete() {
  return (
    <StyleLayout>
      <Page>
        <section>
          <Center className="header">
            <div className="emoji">👖</div>
            <div className="title">사이즈 추천 완료</div>
            <div className="subtitle">전체, 키:000cm, 몸무게:00kg, 발사이즈 000, 허벅지사이즈: 남는다, 속옷사이즈: 000, 체형:혀벅지 평균 이상의 추천 내역입니다.</div>
          </Center>
        </section>
        <section>
          <CardItems />
        </section>
      </Page>
    </StyleLayout>
  );
}
