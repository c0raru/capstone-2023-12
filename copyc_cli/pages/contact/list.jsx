/*
  @page        : /contact/list
  @description : 1:1 문의 내역
*/
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Tag } from "src/components/styles";
import { ItemList } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import styled from "styled-components";
import { responseMessage } from "utils";
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'

export default function CustomerContactList() {
  const router = useRouter();

  const [items, setItems] = useState([]);

  useEffect(() => {
    responseMessage(axios.get("contact/")).then(({ data }) => {
      setItems(data);
    });
  }, []);

  return (
    <OnlyUserLayout>
    <MainLayout category="문의 내역 확인" white>
      <ItemList>
         {items.map((item) => {
          return (
            <div onClick={() => router.push("/contact/" + item.id)}>
              <div className="title">
                {item.is_answered ? (
                  <Tag color="#000">답변완료</Tag>
                ) : (
                  <Tag color="#BDBDBD">접수</Tag>
                )}
                {item.title}
              </div>
              <div className="date">
                <Moment format="YYYY.MM.DD HH:mm">{item.question_at}</Moment>
              </div>
            </div>
          );
        })}

        {
          items.length === 0 && (
            <div>
              문의하신 내용이 없습니다.
            </div>
          )
        }
      </ItemList>
    </MainLayout>
    </OnlyUserLayout>
  );
}
