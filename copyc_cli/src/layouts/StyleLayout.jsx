import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Icon, Input } from "semantic-ui-react";
import { Button } from "src/components/button";
import { Center } from "src/components/styles";
import styled from "styled-components";
import { responseMessage } from "utils";
import MainLayout from "./MainLayout";

const Component = styled.div`
  height: calc(100vh - 72px);
  .header {
    margin-top: 36px;
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 59px;
    .title {
      margin-top: 10px;
    }
    .subtitle {
      margin-top: 2px;
      font-weight: normal;
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #616161;
    }
  }
  > .slick-slider {
    height: 100%;
    > * {
      height: 100%;
    }
  }
`;

export default function StyleLayout(props) {
  const slick_ = useRef()
  const [page, setPage] = useState(1)
  const router = useRouter()
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    beforeChange: (oldIndex, newIndex) => setPage(newIndex + 1)
  };
  const next = () => {
    if(props.onChangeStep(page, slick_.current)) {
      slick_.current.slickNext()
    }
  }
  const complete = () => {
    props.onComplete()
  }
  return (
    <MainLayout category="업로드하기" white>
      <Component>
        {
          props.slide ? (
            <Slider {...settings} ref={slick_}>{props.children}</Slider>
          ) : (
            <div>{props.children}</div>
          )
        }
      </Component>
      {
        props.slide && (
          <section className="sticky">
              {
                page === 5 ? (
                    <Button onClick={complete} point>사이즈 추천 받기</Button>
                ) : (
                    <Button onClick={next}>다음 ({page}/5)</Button>
                )
              }
          </section>
        )
      }
    </MainLayout>
  );
}
