/*
  @page        : /styles/notice
  @description : 공지사항 게시물 리스트
*/
import MainLayout from 'src/layouts/MainLayout'
import {ItemList} from 'src/components/styles'
import {Icon} from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useNotice } from 'src/hooks/NoticeContext'
import { useEffect, useState } from 'react'
import { responseMessage } from 'utils'
import Moment from 'react-moment'

export default function CustomerNotice() {
  const router = useRouter()
  const notice = useNotice()
  const [fixedItems, setFixedItems] = useState([])
  const [items, setItems] = useState([])
  useEffect(() => {
    responseMessage(notice.list(true)).then(({data}) => {
      setFixedItems(data)
    })
    responseMessage(notice.list()).then(({data}) => {
      setItems(data)
    })
  }, [])

  const notices = [...fixedItems, ...items]
  return (
    <MainLayout category="공지사항" white>
      <ItemList>
        {
          notices.map(item => {
            return (
              <div onClick={() => router.push("/notice/" + item.id)}>
                <div className="title">
                  {
                    item.fixed && (
                      <span className="highlight">
                        <Icon name="bell" /> [공지]
                      </span>
                    )
                  }
                  {item.title}
                </div>
                <div className="date">
                  <Moment format="YYYY.MM.DD">{item.date}</Moment>
                </div>
              </div>
            )
          })
        }
      </ItemList>
    </MainLayout>
  )
}
