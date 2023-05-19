/*
  @page        : /styles
  @description : 스타일 추천 메인페이지
*/
import Link from 'next/link'
import { Button } from 'src/components/button'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'

const Page = styled.div`
  background-image: url('/next/images/styles/front.svg');
  height: calc(100vh - 72px);
  display: flex;
  .header {
    margin-top: 20px;
    >img {
      width: 100%;
    }
  }
  .footer {
    margin-top: auto;
    text-align: center;
    >img {
      width: 100%;
      max-width: 300px;
    }
  }
`

export default function Styles() {
  return (
    <OnlyUserLayout>
    <MainLayout category="사이즈 추천" point>
      <Page>
        <section>
          <div className='header'>
            <img src="/next/images/styles/header.svg"/>
          </div>
          <div className='footer'>
            <img src="/next/images/styles/people.svg"/>
            <Link href="/styles/request">
              <Button style={{marginTop: -3}}>사이즈 추천받으러 가기 Touch!</Button>
            </Link>
          </div>
        </section>
      </Page>
    </MainLayout>
    </OnlyUserLayout>
  )
}
