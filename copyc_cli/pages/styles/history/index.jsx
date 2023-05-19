/*
  @page        : /styles/history
  @description : 스타일 추천 History
*/
import { useRouter } from "next/router";
import { ItemList } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import { responseMessage } from "utils";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";

export default function StylesHistory() {
  const router = useRouter();
  const [items, setItems] = useState([])
  useEffect(() => {
    responseMessage(axios.get("/style")).then(({data}) => setItems(data))
  }, [])
  return (
    <OnlyUserLayout>
    <MainLayout category="스타일 추천 History" white>
      <ItemList>
        {
          items.map(item => {
            return (
              <div onClick={() => router.push("/styles/history/" + item.id)}>
                <div className="title">
                  {item.category.name}, 키:{item.tall}cm, 몸무게:{item.weight}kg, 발사이즈: {item.foot}mm, 허벅지: {item.thigh}, 속옷사이즈: {item.underwear}, 체형: {item.body}
                </div>
                <div className="date">
                  <Moment format="YYYY-MM-DD">{item.create_at}</Moment>
                </div>
              </div>
            )
          })
        }
      </ItemList>
    </MainLayout>
    </OnlyUserLayout>
  );
}
