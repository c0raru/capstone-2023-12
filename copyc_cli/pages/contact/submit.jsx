/*
  @page        : /styles/contact/submit
  @description : 문의하기 페이지의 문의 내용을 입력하는 부분
*/
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'src/components/button'
import { Input } from 'src/components/input'
import { Textarea } from 'src/components/input'
import { Label } from 'src/components/styles'
import { useContact } from 'src/hooks/ContactContext'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'
import { responseMessage } from 'utils'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'

export default function CustomerContactSubmit(props) {
  const contact = useContact()
  const router = useRouter()
  const [category, setCategory] = useState([])

  const [form, setForm] = useState({
    "category": "",
    "title": "",
    "contents": ""
  })

  const update = (name, value) => {
    form[name] = value
    setForm({...form})
  }

  const onClickHandler = () => {
    responseMessage(axios.post("contact/", form))
    .then(() => {
      toast.success("1:1문의를 작성하였습니다.")
      router.push("/contact/list/")
    })
  }

  useEffect(() => {
    responseMessage(contact.get_category())
    .then(({data}) => {
      setCategory(data.map(x => {
        return {
          "text": x.name,
          "value": x.id,
          "key": x.id,
        }
      }))
    })
  }, [])

  return (
    <OnlyUserLayout>
    <MainLayout category="1:1 문의">
      <section>
        <Label>문의유형</Label>
        <Dropdown selection placeholder="상품문의" options={category} value={form.category} onChange={(e, {value}) => update("category", value)}/>
        <br/>
        <Input placeholder="제목을 입력해주세요." value={form.title} onChange={(e) => update("title", e.target.value)}/>
        <Textarea placeholder="정확한 상담을 위하여 자세한 문의사항을 작성 부탁드립니다." rows={10} value={form.contents} onChange={(e) => update("contents", e.target.value)}/>
      </section>
      <section className="bottom">
        <Button onClick={onClickHandler}>문의하기</Button>
      </section>
    </MainLayout>
    </OnlyUserLayout>
  )
}
