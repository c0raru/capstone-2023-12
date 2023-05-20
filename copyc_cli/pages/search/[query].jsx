import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import { LinkButton } from 'src/components/button'
import { CardItems } from 'src/components/card'
import { Card } from 'src/components/card'
import { LabelMenu } from 'src/components/styles'
import { ImageBannerContents } from 'src/components/styles'
import { useProduct } from 'src/hooks/ProductContext'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #000000;
  }
`

const StyledDropdown = styled(Dropdown)`
  padding: 7px 14px;
  border: 1px solid #E0E0E0;
  border-radius: 30px;
  font-size: 14px;
  line-height: 20px;
  color: #212121;
`

export default function Search() {

  const router = useRouter()
  const product = useProduct();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const search = (first=false) => {
    let page_ = page
    if(first) {
      page_ = 1
    }
    product.search(page_, router.query.query, false)
    .then(({data}) => {
      setItems(data.results)
      setPage(page_ + 1)
      setCount(data.count)
    })
  }

  useEffect(() => {
    if(!router.isReady) return
    search(true)
  }, [router.isReady, router.query])

  return (
    <MainLayout>
      <section>
        <SearchResult>
          <div className="title">총 {count}개</div>
        </SearchResult>
        <CardItems items={items}/>
      </section>
    </MainLayout>
  )
}
