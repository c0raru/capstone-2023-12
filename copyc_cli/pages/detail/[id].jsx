import { Dropdown, Icon } from "semantic-ui-react";
import { SquareImage } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import Slider from "react-slick";
import styled from "styled-components";
import { CheckButton } from "src/components/button";
import { CheckButtonGroup } from "src/components/button";
import NumberFormat from "react-number-format";
import { CardItems } from "src/components/card";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProduct } from "src/hooks/ProductContext";
import { responseMessage } from "utils";
import { Button } from "src/components/button";
import { Counter } from "src/components/input";
import { toast } from "react-toastify";
import axios from "axios";

const Page = styled.div`
  .slick-dots {
    position: relative;
    top: -40px;
    bottom: 0px;
    z-index: 10000;
  }
  .slick-dots li.slick-active button:before {
    color: #fff;
  }
  .slick-dots li button:before {
    color: #fff;
  }
  .slick-slider {
    margin-bottom: -22px;
  }
  margin-bottom: 100px;
`;

const Header = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);
  padding: 16px;
  .category {
    font-size: 14px;
    line-height: 20px;
    color: #757575;
  }
  .title {
    font-size: 16px;
    line-height: 23px;
    color: #212121;
    margin-top: 6px;
    margin-bottom: 10px;
  }
  .price {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: #212121;
  }
`;

const Section = styled.div`
  padding: 16px;
  background: #fafafa;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);
  .description {
    > * {
      overflow-y: hidden;
      overflow-x: auto;
    }
    margin-top: 16px;
    img {
      width: 100% !important;
      height: auto !important;
    }
  }
  .title {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #212121;
    margin-bottom: 10px;
  }
`;

const Footer = styled.div`
  > .cover {
    position: fixed;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
  > div {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.08);
    > div {
      padding: 16px;
    }
    .item-group {
      background-color: #f5f5f5;
      max-height: 240px;
      overflow-y: auto;
      > div {
        padding: 16px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
        border-radius: 8px;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0px;
        }
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          line-height: 16px;
          color: #212121;
          &:last-child {
            margin-top: 8px;
            .price {
              font-weight: bold;
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
    }
    .total {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
      align-items: center;
      div:first-child {
        font-size: 14px;
        color: #757575;
      }
      div:last-child {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        text-align: right;
        color: #ff4f4d;
      }
    }
    .button-group {
      display: flex;
      width: 100%;
      .button {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
        border-radius: 8px;
        width: 52px;
        height: 52px;
        margin-right: 8px;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button {
        margin: 0px;
      }
    }
  }
`;

export default function ProductDetail() {

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const product = useProduct();
  const router = useRouter();

  const [form, setForm] = useState({});
  const [isLike, setIsLike] = useState(false);


  const likeHandler = () => {
    responseMessage(
      isLike ? product.dislike(form.id) : product.like(form.id)
    ).then(() => {
      setIsLike(!isLike);
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    product.detail(router.query.id).then(({ data }) => {
      setForm(data);
    });
    product.is_like(router.query.id).then(({ data }) => {
      setIsLike(data.is_like);
    });
  }, [router.query, router.isReady]);

  if (!form) {
    return <></>;
  }

  const saveHandler = () => {

  }

  const images = form?.images?.map((item) => item)

  return (
    <MainLayout inversed removeSearch>
      <Page>
        <Slider {...settings}>
          {images?.map((image) => {
            return (
              <div>
                <SquareImage image={image?.image} />
              </div>
            );
          })}
        </Slider>
        <Header style={{marginTop: 25}}>
          <div className="category">
            {form?.category?.name}
          </div>
          <div className="title">{form.name}</div>
          <div className="price">
            {parseInt(form.price).toLocaleString()} COIN
          </div>
        </Header>
        <Section>
          <Button point onClick={saveHandler}>
            저장하기
          </Button>
          <CheckButtonGroup>
            <CheckButton>
              <Icon name="share alternate" />
              공유하기
            </CheckButton>
            <CheckButton onClick={likeHandler}>
              {isLike ? (
                <Icon name="heart" color="red" />
              ) : (
                <Icon name="heart outline" />
              )}
              선호 스타일
            </CheckButton>
          </CheckButtonGroup>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: form.contents?.replace("\n", "<br/>") }}
          />
        </Section>
      </Page>
    </MainLayout>
  );
}
