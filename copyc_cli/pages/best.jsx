import Head from 'next/head'
import Image from 'next/image'
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

export default function Best() {
  const [bestItems, setBestItems] = useState([]);
  const product = useProduct()
  useEffect(() => {
    const page = 1
    product.search(page)
    .then(({data}) => {
      setBestItems(data.results)
    })
  }, [])

  return (
    <MainLayout category="COPYC">
      <section>
        <CardItems items={bestItems}/>
      </section>
    </MainLayout>
  )
}
