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
import { Button } from "src/components/button";
import { Counter } from "src/components/input";
import { ImageContents } from "src/components/styles";
import OnlyUserLayout from "src/layouts/OnlyUserLayout";
import axios from "axios";
import NumberFormat from "react-number-format";

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

const OrderPrice = styled.div`
  margin-top: 20px;
  > div {
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
      > div:last-child {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        text-align: right;
        color: #ff4f4d;
      }
    }
  }
`;

const BoxItem = styled.div`
  padding: 10px 6px;
  display: flex;
  .checkbox {
    padding-top: 5px;
  }
  .image {
    width: 88px;
    height: 88px;
    border-radius: 12px;
    border: 1px solid #eee;
    margin-left: 6px;
    margin-right: 12px;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    color: #212121;
    margin-top: 8px;
  }
  .brand {
    font-size: 14px;
    color: #212121;
    margin: 4px 0px;
  }
  .option {
    font-size: 13px;
    line-height: 16px;
    color: #757575;
  }
  .counter {
    margin-top: 12px;
    margin-bottom: 12px;
    >div {
      width: 108px !important;
    }
  }
  .price {
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 8px;
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  &:last-child {
    border-bottom: 0px;
  }
`;

export default function ShopOrder() {
  const router = useRouter();
  const [items, setItems] = useState([])
  const [form, setForm] = useState({
    "count": {},
    "checked": {}
  })

  const onChangeCount = (item, count) => {
    form['count'][item.id] = count
    setForm({...form})
  }

  const setChecked = (item, checked) => {
    form.checked[item.id] = {
      item: item,
      checked: checked
    }
    setForm({...form})
  }

  useEffect(() => {
    responseMessage(axios.get("product/cart/"))
    .then(({data}) => {
      setItems(data)
    })
  }, []);

  const totalPrice = Object.keys(form.checked)
                      .filter(key => form.checked[key].checked)
                      .map(key => form.checked[key].item)
                      .map(item => item.product.price * (form.count[item.id] || item.count))
                      .reduce(((x, y) => { return x + y }), 0)
  
  return (
    <OnlyUserLayout>
      <MainLayout category="장바구니">
        <Box>
          {items.map((item) => {
            const _count = form?.count[item.id] || item.count
            const checked = form?.checked[item.id]?.checked
            return (
              <BoxItem>
                <div className="checkbox">
                  <Checkbox active={checked} onClick={() => setChecked(item, !checked)}/>
                </div>
                <div>
                  <ImageContents
                    image={item.product.thumbnail}
                    className="image"
                  />
                </div>
                <div>
                  <div className="title">{item.product.name}</div>
                  <div className="brand">{item.product.brand.name} | {item.product.category.name}</div>
                  <div className="option">사이즈: {item.option.size}</div>
                  <div className="counter">
                    <Counter value={_count} onChange={(count) => onChangeCount(item, count)}/>
                  </div>
                  <div className="price">
                    <NumberFormat value={item.product.price * _count} displayType={'text'} thousandSeparator={true} />원
                  </div>
                </div>
              </BoxItem>
            );
          })}
        </Box>
        <Box>
          <div className="title">
            <div>결제 코인</div>
          </div>
          <div className="body">
            <OrderPrice>
              <div>
                <div>코인</div>
                <div>
                  <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} />coin
                </div>
              </div>
              <div>
                <div>코인</div>
                <div>50 coin </div>
              </div>
              <div class="total">
                <div>총 결제 코인</div>
                <div>
                  <NumberFormat value={totalPrice + 50} displayType={'text'} thousandSeparator={true} />coin
                </div>
              </div>
            </OrderPrice>
          </div>
        </Box>
        <section className="bottom">
          <Button point>주문하기</Button>
        </section>
      </MainLayout>
    </OnlyUserLayout>
  );
}
