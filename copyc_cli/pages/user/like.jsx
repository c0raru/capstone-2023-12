/*
  @page        : /user/like
  @description : 선호 스타일
*/
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { CardItems } from "src/components/card";
import { Card } from "src/components/card";
import { WarningText } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";
import styled from "styled-components";
import { responseMessage } from "utils";

export default function UserLike() {
  const [items, setItems] = useState([])
  useEffect(() => {
    responseMessage(axios.get("product/like/"))
    .then(({data}) => setItems(data.map(x => x.product)))
  }, [])
  return (
    <OnlyUserLayout>
    <MainLayout category="찜 내역">
      <section>
        <CardItems items={items}/>
        {
          items.length === 0 && (
            <WarningText>선호하는 사진이 없습니다.</WarningText>
          )
        }
      </section>
    </MainLayout>
    </OnlyUserLayout>
  );
}
