/*
  @page        : /shop/order/?id={order_number}
  @description : {order_number}에 대한 주문
*/
import MainLayout from "src/layouts/MainLayout";
import { ItemList } from "src/components/styles";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useNotice } from "src/hooks/NoticeContext";
import { useEffect, useState } from "react";
import { responseMessage } from "utils";
import Moment from "react-moment";
import styled from "styled-components";
import { Checkbox } from "src/components/input";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";

const Box = styled.div`
  margin-top: 16px;
  padding: 24px 16px;
  background: #ffffff;
  box-shadow: 0px -1px 0px #eeeeee, 0px 1px 0px #eeeeee;
  .title {
    > div:first-child {
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #212121;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .body {
    font-size: 14px;
    line-height: 32px;
    color: #757575;
  }
`;

const AgreeBox = styled.div`
  padding: 24px 16px;
`;

const OrderPrice = styled.div`
    margin-top: 20px;
    >div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        &.total {
            margin-bottom: 0px;
            align-items: center;
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #212121;
            margin-top: 20px;
            >div:last-child {
                font-weight: bold;
                font-size: 18px;
                line-height: 26px;
                text-align: right;
                color: #FF4F4D;
            }
        }
    }
`

export default function ShopOrder() {
  const router = useRouter();
  useEffect(() => {}, []);

  return (
    <OnlyUserLayout>
    <MainLayout category="주문하기">
      <Box>
        <div className="title">
          <div>배송지 정보</div>
          <a href="/shop/order/address">추가하기</a>
        </div>
        <div className="body">
            <div>홍길동 010-1234-1234</div>
            <div>주소, 상세주소</div>
        </div>
      </Box>
      <Box>
        <div className="title">
          <div>배송지 정보</div>
          <a href="">변경하기</a>
        </div>
        <div className="body">배송지 정보를 추가해주세요.</div>
      </Box>
      <Box>
        <div className="title">
          <div>결제수단</div>
        </div>
        <div className="body">
          <Checkbox active />
          &nbsp;&nbsp; 토스페이먼츠
        </div>
      </Box>
      <Box>
        <div className="title">
          <div>결제금액</div>
        </div>
        <div className="body">
            <OrderPrice>
                <div>
                    <div>총 상품 금액</div>
                    <div>100,000원</div>
                </div>
                <div>
                    <div>총 배송비</div>
                    <div>100,000원</div>
                </div>
                <div class="total">
                    <div>총 결제 금액</div>
                    <div>100,000원</div>
                </div>
            </OrderPrice>
        </div>
      </Box>
      <AgreeBox>
        
      </AgreeBox>
    </MainLayout>
    </OnlyUserLayout>
  );
}
