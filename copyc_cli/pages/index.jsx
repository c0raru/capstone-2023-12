import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { LinkButton } from "src/components/button";
import { CardItems } from "src/components/card";
import { Card } from "src/components/card";
import { LabelMenu } from "src/components/styles";
import { ImageBannerContents } from "src/components/styles";
import { useProduct } from "src/hooks/ProductContext";
import MainLayout from "src/layouts/MainLayout";
import styled from "styled-components";

const HelpDesk = styled.div`
  background: #212121;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-top: 60px;
  padding: 48px 0px;
  > div {
    margin-bottom: 24px;
  }
`;

const SizeRecommendButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 24px;
  padding: 12px 32px;
  background: #7a60ff;
  border-radius: 60px;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

export default function Home() {
  const product = useProduct();
  const [bestItems, setBestItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const page = 1
    product.search(page , "", false, 1)
    .then(({data}) => {
      setBestItem(data.results)
    })
  }, [])

  useEffect(() => {
    const page = 1
    product.search(page , "", false, 6)
    .then(({data}) => {
      setBestItems(data.results)
      setPage(page + 1)
    })
  }, [])

  const router = useRouter()

  return (
    <MainLayout>
      <section>
        <ImageBannerContents>
          <div><span>NEW</span></div>
          <div><span>copyc</span></div>
          <div><span>100 coin</span></div>
        </ImageBannerContents>

        {historyItems.length ? (
          <>
            <LabelMenu title="History" subtitle="내역보기" url="/styles/history" />
            <CardItems items={historyItems}/>
          </>
        ) : (
        <Link href = "/upload">
          <LinkButton style={{marginTop: 24}}>
            <Icon name="picture" />
            이미지 업로드 
          </LinkButton>
        </Link>
        )}
        <LabelMenu title="New Pic" subtitle="전체보기" url="/best" />
        <CardItems items={bestItems}/>
      </section>
    </MainLayout>
  );
}
