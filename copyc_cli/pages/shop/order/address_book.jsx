/*
  @page        : /shop/order/address_book
  @description : 
*/
import MainLayout from "src/layouts/MainLayout";
import { Label } from "src/components/styles";
import { Input } from "src/components/input";
import { Button } from "src/components/button";
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";

const Card = styled.div`
  padding: 24px 16px;
  background-color: #fff;
  margin: 16px 0px;
  >div {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 26px;
    color: #757575;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 36px;
      color: #212121;
      margin-bottom: 10px;
    }
  }
`

export default function ShopOrderAddress() {
  return (
    <OnlyUserLayout>
    <MainLayout category="배송지 변경">
      <div>
        {[1,1,1,1,1].map(() => {
            return (
              <Card>
                <div>
                  <div className="title">홍길동</div>
                  <a>삭제하기</a>
                </div>
                <div>홍길동 010-1234-1234</div>
                <div>주소, 상세주소</div>
              </Card>
            )
          })}
        </div>
        <section className="bottom">
            <Button point>선택하기</Button>
        </section>
    </MainLayout>
    </OnlyUserLayout>
  );
}
