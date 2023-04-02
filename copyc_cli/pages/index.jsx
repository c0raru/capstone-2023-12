import Head from 'next/head'
import Image from 'next/image'
import { Button, Grid } from 'semantic-ui-react'
import { LinkButton } from 'src/components/button'
import { Card } from 'src/components/card'
import { LabelMenu } from 'src/components/styles'
import { ImageBannerContents } from 'src/components/styles'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'

const HelpDesk = styled.div`
  background: #212121;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-top: 60px;
  padding: 48px 0px;
  >div {
    margin-bottom: 24px;
  }
`

const SizeRecommendButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 24px;
  padding: 12px 32px;
  background: #7A60FF;
  border-radius: 60px;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
`

export default function Home() {
  return (
    <MainLayout>
      <section>

        <ImageBannerContents>
          <div>NEW</div>
          <div>바다가 보이는 카페 이미지 (Ocean View Cafe Image)</div>
        </ImageBannerContents>

        <LinkButton style={{marginTop: 24}}>
          이미지 업로드 
        </LinkButton>

      
        <LabelMenu
          title="Best Items"
          subtitle="전체보기"
          url="/"
        />
        <Grid columns={2}>
          <Grid.Column>
            <Card/>
          </Grid.Column>
          <Grid.Column>
            <Card/>
          </Grid.Column>
          <Grid.Column>
            <Card/>
          </Grid.Column>
          <Grid.Column>
            <Card/>
          </Grid.Column>
        </Grid>
      </section>
      <footer>
      </footer>
    </MainLayout>
  )
}
