import Head from 'next/head'
import Image from 'next/image'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import { LinkButton } from 'src/components/button'
import { Card } from 'src/components/card'
import { LabelMenu } from 'src/components/styles'
import { ImageBannerContents } from 'src/components/styles'
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
  return (
    <MainLayout>
      <section>
        <SearchResult>
          <div className="title">총 50개</div>
          <StyledDropdown
            options={[
              {
                "text": "인기순",
                "value": "popular"
              }
            ]}
            value="popular"
          />
        </SearchResult>
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
    </MainLayout>
  )
}
