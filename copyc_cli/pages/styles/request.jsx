/*
  @page        : /styles/request
  @description : 스타일 추천 설문조사 진행
*/
import Link from "next/link";
import { Button } from "src/components/button";
import MainLayout from "src/layouts/MainLayout";
import StyleLayout from "src/layouts/StyleLayout";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import { Center } from "src/components/styles";
import { Label } from "src/components/styles";
import { Input } from "src/components/input";
import { Dropdown } from "semantic-ui-react";
import { NoticeText } from "src/components/styles";
import { useEffect, useState } from "react";
import { responseMessage } from "utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'

const Page = styled.div`
  height: 100%;
`;

const CategoryChoice = styled.section`
  display: grid !important;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  > div {
    border: 1.5px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 8px;
    position: relative;
    ${(props) => {
      return css`
        &[id="${props.active}"] {
          border-color: #7a60ff;
        }
      `;
    }}
    > div {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      .title {
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
        color: #212121;
      }
      .subtitle {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #bdbdbd;
      }
    }
    ${(props) => {
      if (props.square) {
        return css`
          &:after {
            content: "";
            display: block;
            padding-bottom: 100%;
          }
        `;
      }
      return css`
        &:after {
          content: "";
          display: block;
          padding-bottom: 50px;
        }
      `;
    }}
  }
`;

const CataegoryChoiceItem = (props) => {
  return (
    <div {...props}>
      <div>
        <div className="title">{props.title}</div>
        {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
      </div>
    </div>
  );
};

export default function Styles() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    category: null,
    tall: "",
    weight: "",
    foot: "",
    thigh: null,
    underwear: null,
    body: null,
  });

  const update = (name, value) => {
    form[name] = value;
    setForm({ ...form });
  };

  const onChangeStepHandler = (step) => {
    if (step === 1 && !form.category) {
      toast.error("찾으시는 제품을 선택해주세요.");
      return false;
    }
    if (step === 2) {
      if (!form.tall) {
        toast.error("키를 입력해주세요.");
        return false;
      }
      if (!form.weight) {
        toast.error("몸무게를 입력해주세요.");
        return false;
      }
      if (!form.foot) {
        toast.error("발 사이즈를 선택해주세요.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.thigh) {
        toast.error("허벅지사이즈를 선택해주세요.");
        return false;
      }
    }
    if (step === 4) {
      if (!form.underwear) {
        toast.error("속옷사이즈를 선택해주세요.");
        return false;
      }
    }
    if (step === 5) {
      if (!form.body) {
        toast.error("체형을 선택해주세요.");
        return false;
      }
    }
    return true;
  };

  const onCompleteHandler = () => {
    responseMessage(axios.post("/style/", form)).then(({ data }) => {
      router.push("/styles/history/" + data.id + "?new=true");
    });
  };

  useEffect(() => {
    responseMessage(axios.get("/product/category/")).then(({ data }) => {
      setItems(data);
    });
  }, []);

  const FOOT_SIZES = [
    220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290,
    295, 300,
  ].map((item) => {
    return {
      key: item,
      value: item,
      text: item + "mm",
    };
  });

  return (
    <OnlyUserLayout>
      <StyleLayout
        slide
        onChangeStep={onChangeStepHandler}
        onComplete={onCompleteHandler}
      >
        <Page>
          <Center className="header">
            <div className="emoji">🔎</div>
            <div className="title">어떤 제품을 찾고계신가요?</div>
          </Center>
          <CategoryChoice square active={form.category}>
            <CataegoryChoiceItem
              title="전체"
              subtitle="ALL"
              onClick={() => update("category", "all")}
              id="all"
            />
            {items.map((item) => {
              return (
                <CataegoryChoiceItem
                  title={item.name}
                  subtitle={item.english}
                  onClick={() => update("category", item.id)}
                  id={item.id}
                />
              );
            })}
          </CategoryChoice>
        </Page>
        <Page>
          <Center className="header">
            <div className="emoji">📐</div>
            <div className="title">신체사이즈를 알려주세요</div>
            <div className="subtitle">저희만 알고 있을게요</div>
          </Center>
          <section>
            <Label>키 (cm)</Label>
            <Input
              placeholder="키를 입력해주세요"
              type="number"
              value={form.tall}
              onChange={(e) => update("tall", e.target.value)}
            />
            <Label>몸무게 (kg)</Label>
            <Input
              placeholder="몸무게를 입력해주세요"
              type="number"
              value={form.weight}
              onChange={(e) => update("weight", e.target.value)}
            />
            <Label>발 사이즈 (mm)</Label>
            <Dropdown
              options={FOOT_SIZES}
              placeholder="혹은 손가락(엄지, 약지)으로 발을 쟀을 때 mm"
              fluid
              selection
              value={form.foot}
              onChange={(e, { value }) => update("foot", value)}
            />
          </section>
        </Page>
        <Page>
          <Center className="header">
            <div className="emoji">🦵🏼</div>
            <div className="title">허벅지 사이즈를 알려주세요</div>
            <div className="subtitle">
              두 손가락으로 허벅지가 남는지 알려주세요
            </div>
          </Center>
          <section>
            <img src="/next/images/styles/size.svg" />
          </section>
          <CategoryChoice active={form.thigh}>
            <CataegoryChoiceItem
              title="남는다"
              onClick={() => update("thigh", "LEFT")}
              id="LEFT"
            />
            <CataegoryChoiceItem
              title="딱맞다"
              onClick={() => update("thigh", "FIT")}
              id="FIT"
            />
            <CataegoryChoiceItem
              title="널널하다"
              onClick={() => update("thigh", "LOOSE")}
              id="LOOSE"
            />
          </CategoryChoice>
        </Page>
        <Page>
          <Center className="header">
            <div className="emoji">🩲</div>
            <div className="title">속옷 사이즈를 알려주세요</div>
            <div className="subtitle">비밀보장 ! 당황할필요 없어요</div>
          </Center>
          <CategoryChoice active={form.underwear}>
            {[95, 100, 105, 110].map((size) => {
              return (
                <CataegoryChoiceItem
                  title={size}
                  onClick={() => update("underwear", size)}
                  id={size}
                />
              );
            })}
          </CategoryChoice>
          <section>
            <NoticeText>
              - 사이즈를 구체화하기 위한 필수과정입니다.
              <br />
              &nbsp;&nbsp;&nbsp;사용자가 입력한 정보는 서비스 제공에만 활용되며,
              외부로 공개되지 않습니다.
            </NoticeText>
          </section>
        </Page>
        <Page>
          <Center className="header">
            <div className="emoji">🤸</div>
            <div className="title">체형을 알려주세요</div>
            <div className="subtitle">마지막 질문이에요!</div>
          </Center>
          <CategoryChoice active={form.body}>
            {[
              ["A", "허벅지 평균 이상"],
              ["B", "종아리 평균 이상"],
              ["C", "마른체형"],
              ["D", "골격 체형"],
              ["E", "골반 발달"],
              ["F", "딱히 없다"],
            ].map((item) => {
              return (
                <CataegoryChoiceItem
                  title={item[1]}
                  onClick={() => update("body", item[0])}
                  id={item[0]}
                />
              );
            })}
          </CategoryChoice>
          <section>
            <NoticeText>
              - 사이즈를 구체화하기 위한 필수과정입니다.
              <br />
              &nbsp;&nbsp;&nbsp;사용자가 입력한 정보는 서비스 제공에만 활용되며,
              외부로 공개되지 않습니다.
            </NoticeText>
          </section>
        </Page>
      </StyleLayout>
    </OnlyUserLayout>
  );
}
