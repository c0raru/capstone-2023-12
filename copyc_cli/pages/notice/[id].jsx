/*
  @page        : /styles/notice/[id]
  @description : 공지사항 게시물 상세
*/
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SplitView } from 'src/components/styles'
import { useNotice } from 'src/hooks/NoticeContext'
import MainLayout from 'src/layouts/MainLayout'
import { responseMessage } from 'utils'
import Moment from 'react-moment'
import styled from 'styled-components'

const Contents = styled.div`
  img {
    width: 100% !important;
    height: auto !important;
  }
`

export default function CustomerNoticeDetail() {
  const notice = useNotice()
  const [form, setForm] = useState([])
  const router = useRouter()

  useEffect(() => {
    if(!router.isReady) return
    responseMessage(notice.detail(router.query.id)).then(({data}) => {
      setForm(data)
    })
  }, [router.isReady])

  return (
    <MainLayout category="공지사항" white>
      <SplitView>
        <section className="header">
          <div className="title">{form.title}</div>
          <div className="date"><Moment format="YYYY.MM.DD">{form.date}</Moment></div>
        </section>
        <section className="contents">
          <Contents dangerouslySetInnerHTML={{__html: form.contents}}/>
        </section>
      </SplitView>
    </MainLayout>
  )
}
