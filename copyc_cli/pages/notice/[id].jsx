import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #9999;
`

const Content = styled.div`
  padding: 10px;
  background-color: #eee;
`

export default function CustomerNoticeDetail() {
  const router = useRouter()
  const [data, setData] = useState({})
  useEffect(() => {
    if(!router.isReady) {
      return;
    }
    axios.get("/notice/" + router.query.id).then(({data}) => {
      setData(data);
    })
  }, [router.isReady])
  return (
    <MainLayout category="공지사항">
      <section>
        <Title>{data.title}</Title>
        <Content
          dangerouslySetInnerHTML={{__html: data.contents}}
        />
      </section>
    </MainLayout>
  )
}
