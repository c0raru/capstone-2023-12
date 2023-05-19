/*
  @page        : /user/history
  @description : 구매내역을 보여주는 페이지
*/
import { ImageContents } from "src/components/styles";
import MainLayout from "src/layouts/MainLayout";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";
import styled from "styled-components";

const HistoryItem = styled.div`
  margin-top: 16px;
  background: #ffffff;
  box-shadow: 0px -1px 0px #eeeeee, 0px 1px 0px #eeeeee;
  padding: 16px 24px;
  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #292e33;
    margin-bottom: 12px;
  }
  .items {
    > div {
      padding: 12px 0px;
      border-top: 1px solid #eee;
      &:first-child {
        border-top: 0px;
      }
      display: flex;
      .thumbnail {
        width: 88px;
        height: 88px;
        margin-right: 15px;
      }
      & > div:last-child {
        display: flex;
        flex-direction: column;
        padding: 5px 0px;
        .brand {
          font-weight: bold;
          font-size: 13px;
          color: #212121;
        }
        .title {
          font-size: 16px;
          color: #212121;
          margin: 4px 0px;
        }
        .option {
          font-size: 13px;
          color: #757575;
        }
        .price {
          margin-top: auto;
          font-weight: bold;
          font-size: 18px;
          color: #212121;
        }
      }
    }
  }
`;

export default function History(props) {
  return (
    <OnlyUserLayout>
    <MainLayout category="저장내역">
      <HistoryItem>
        <div className="title">2023.04.30·저장완료</div>
        <div className="items">
          <div>
            <ImageContents className="thumbnail" />
            <div>
              <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
          <div>
            <ImageContents className="thumbnail" />
            <div>
            <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
          <div>
            <ImageContents className="thumbnail" />
            <div>
            <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
        </div>
      </HistoryItem>
      <HistoryItem>
        <div className="title">2023.04.30·저장완료</div>
        <div className="items">
          <div>
            <ImageContents className="thumbnail" />
            <div>
            <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
          <div>
            <ImageContents className="thumbnail" />
            <div>
            <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
          <div>
            <ImageContents className="thumbnail" />
            <div>
            <div className="brand">Brand</div>
              <div className="title">사진 이름</div>
              <div className="option">카픽｜카픽｜카픽</div>
              <div className="price">100coin</div>
            </div>
          </div>
        </div>
      </HistoryItem>
    </MainLayout>
    </OnlyUserLayout>
  );
}
