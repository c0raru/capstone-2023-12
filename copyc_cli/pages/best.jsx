import Head from 'next/head'
import Image from 'next/image'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import { LinkButton } from 'src/components/button'
import { Card } from 'src/components/card'
import { LabelMenu } from 'src/components/styles'
import { ImageBannerContents } from 'src/components/styles'
import MainLayout from 'src/layouts/MainLayout'
import styled from 'styled-components'

export default function Best() {
  return (
    <MainLayout category="Best Items">
      <section>
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
