/*
  @page        : /contact/[id]
  @description : 1:1 문의 내역 상세를 보여줍니다.
*/
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Center } from 'src/components/styles'
import { SplitView } from 'src/components/styles'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'
import { responseMessage } from 'utils'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'

const Page = styled.div`
  background-color: #fff;
`

const Answer = styled.div`
  padding: 16px;
  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #212121;
  }
  .date {
    margin-top: 12px;
    font-size: 14px;
    line-height: 16px;
    color: #BDBDBD;
 }
  .contents {
    margin-top: 24px;
    font-size: 14px;
    line-height: 160%;
    color: #212121;
  }
`

export default function CustomerContactList() {

  const router = useRouter()
  const [form, setForm] = useState({
    "title": "",
    "contents": "",
    "answer": "",
    "is_answered": false,
    "question_at": null,
    "answered_at": null,
    "user": null,
    "category": {}
  })

  useEffect(() => {
    if(!router.isReady) return
    responseMessage(axios.get("contact/" + router.query.id))
    .then(({data}) => setForm(data))
  }, [router.isReady])

  return (
    <OnlyUserLayout>
    <MainLayout category="문의 내역 확인">
      <Page>
        <SplitView>
          <section className="header">
            <div className="title">
              <b>{form.category.name}</b><br/>
              {form.title}
            </div>
            <div className="date">
              <Moment format="YYYY.MM.DD">{form.question_at}</Moment>
            </div>
          </section>
          <section className="contents">
            <div dangerouslySetInnerHTML={{__html: form.answer}}/>
          </section>
        </SplitView>
      </Page>
      <Answer>
        {
          form.answered_at ? (
            <>
              <div className='date'>
                <Moment format="YYYY.MM.DD">{form.answered_at}</Moment>
              </div>
              <div className='contents' dangerouslySetInnerHTML={{__html: form.answer}}/>
            </>
          ) : (
            <div>
              <Center style={{margin: "50px 0px"}}>
                <b>아직 답변이 달리지 않았습니다.</b>
              </Center>
            </div>
          )
        }
      </Answer>
    </MainLayout>
    </OnlyUserLayout>
  )
}
