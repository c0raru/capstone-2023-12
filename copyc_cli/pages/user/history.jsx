/*
  @page        : /user/history
  @description : 구매내역을 보여주는 페이지
*/
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
          font-size: 25px;
          color: #212121;
          font-weight: 100;
          margin-top: 8px;
          margin-bottom: 0px;
        }
        .option {
          font-size: 13px;
          color: #757575;
        }
        .price {
          margin-top: auto;
          font-weight: 400;
          font-size: 18px;
          color: #212121;
        }
      }
    }
  }
`;

export default function History(props) {
  const router = useRouter()
  const [history, setHistory] = useState([])
  useEffect(() => {
    axios.get("/product/viewhistory")
    .then(({data}) => {
      setHistory(data)
    })
    .catch(err => {
      toast.error("로그인이 필요합니다.")
      router.back()
    })
  }, [])

  return (
    <OnlyUserLayout>
    <MainLayout category="저장내역">
      <HistoryItem>
        <div className="items">
          {
            history.map(item => {
              return (
                <div onClick={()=>{
                  router.push("/detail/" + item.product.id)
                }}>
                  <ImageContents className="thumbnail" image={item?.product?.thumbnail} />
                  <div>
                    <div className="option">{item?.product?.category?.name}</div>
                    <div className="title">{item?.product?.name}</div>
                    <div className="price">{parseInt(item?.product?.price).toLocaleString()} coin</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </HistoryItem>
    </MainLayout>
    </OnlyUserLayout>
  );
}
