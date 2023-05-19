/*
  @page        : /contact
  @description : 문의하기 페이지, 문의 내역 확인 페이지 또는 1:1 문의 페이지로 이동 할 수 있다.
*/
import Link from 'next/link'
import { Button } from 'src/components/button'
import { NoticeText } from 'src/components/styles'
import MainLayout from 'src/layouts/MainLayout'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'
import styled from 'styled-components'

const GrayBox = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 16px;
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: #212121;
  }
  .subtitle {
    font-size: 14px;
    line-height: 20px;
    color: #424242;
    margin-bottom: 40px;
  }
`

export default function CustomerContact() {
  return (
    <OnlyUserLayout>
    <MainLayout category="문의하기" white>
      <section>
        <GrayBox>
          <div className='title'>문의 내역 확인</div>
          <div className="subtitle">문의하신 내용을 확인할 수 있습니다.</div>
          <Link href="/contact/list">
          <Button inversed>문의 내역 확인하기</Button>
          </Link>
        </GrayBox>
        <br/>
        <GrayBox>
          <div className='title'>1:1 문의</div>
          <div className="subtitle">어떤점이 궁금하신가요?</div>
          <Link href="/contact/submit">
            <Button inversed>1:1 문의하기</Button>
          </Link>
        </GrayBox>
        <br/>
        <NoticeText>
          - 운영시간 : 평일 11:00 ~ 18:00<br/>
          &nbsp;&nbsp;&nbsp;점심시간 : 13:00 ~ 14:00
        </NoticeText>
      </section>
    </MainLayout>
    </OnlyUserLayout>
  )
}
