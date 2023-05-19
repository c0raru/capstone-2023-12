/*
  @page        : /styles/history/[id]
  @description : 스타일 추천 History를 클릭했을떄 보이는 상세 페이지
*/
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { CardItems } from "src/components/card";
import { Center } from "src/components/styles";
import { WarningText } from "src/components/styles";
import { SplitView } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";
import styled from "styled-components";
import { responseMessage } from "utils";

const Header = styled(Center)`
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #212121;
  .title {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .subtitle {
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    color: #616161;
  }
`;

export default function StylesHistoryDetail() {
  const router = useRouter();
  const [form, setForm] = useState({ isLoading: true });
  useEffect(() => {
    if (!router.isReady) return;
    responseMessage(axios.get("/style/" + router.query.id + "/")).then(
      ({ data }) => setForm(data)
    );
  }, [router.isReady]);

  if (!router.isReady) return <></>;
  if (form.isLoading) return <></>;

  const text = (
    <>
      {form.category.name}, 키:{form.tall}cm, 몸무게:{form.weight}kg, 발사이즈:{" "}
      {form.foot}mm, 허벅지: {form.thigh}, 속옷사이즈: {form.underwear}, 체형:{" "}
      {form.body}에 대한 추천 내역입니다.
    </>
  );

  return (
    <OnlyUserLayout>
    <MainLayout category="스타일 추천 History" white>
      <SplitView>
        {
          router.query.new ? (
            <section>
              <Header>
                <div className="emoji">👖</div>
                <div className="title">사이즈 추천 완료</div>
                <div className="subtitle">{text}</div>
              </Header>
            </section>
          ) : (
            <section className="header">
              <div className="title">{text}</div>
              <div className="date">
                <Moment format="YYYY-MM-DD">{form.create_at}</Moment>
              </div>
            </section>
          )
        }
        <section>
          {form.items.length === 0 && (
            <WarningText>추천된 상품이 없습니다.</WarningText>
          )}
          <CardItems items={form.items} />
        </section>
      </SplitView>
    </MainLayout>
    </OnlyUserLayout>
  );
}
