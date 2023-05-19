import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import { LinkButton } from 'src/components/button'
import { CardItems } from 'src/components/card'
import { Card } from 'src/components/card'
import { LabelMenu } from 'src/components/styles'
import { ImageBannerContents } from 'src/components/styles'
import { useUser } from 'src/hooks/UserContext'
import MainLayout from 'src/layouts/MainLayout'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'
import styled from 'styled-components'

const Profile = styled.div`
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;
  color: #212121;
  padding: 20px;
  .email {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #757575;
    margin-top: 10px;
  }
  background: #F5F5F5;
  box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.3);
`

const SplitView = styled.div`
  background: #FAFAFA;
  border-radius: 12px 0px 0px 12px;
  display: flex;
  >div {
    width: 33.33333%;
    padding: 20px;
    border: 1px solid #eee;
    border-right: 0px;
    &:last-child {
      border-right: 1px solid #eee;
    }
    .title {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #616161;
    }
    .count {
      font-weight: bold;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      color: #212121;
    }
  }
`

const Menu = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  >div {
    display: flex;
    height: 36px;
    margin: 6px 12px;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
    line-height: 36px;
    color: #212121;
    align-items: center;
    cursor: pointer;
    .label {
      background: #F5F5F5;
      backdrop-filter: blur(20px);
      border-radius: 50px;
      padding: 0px 16px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F5F5F5;
      backdrop-filter: blur(20px);
      border-radius: 50px;
      font-size: 14px;
    }
  }
`

export default function UserMypage() {
  const user = useUser()
  const info = user.userinfo.data
  const router = useRouter()
  const logout = () => {
    user.logout()
    router.push("/")
  }
  useEffect(() => {
    if(!user.userinfo.loading) {
      if(user.userinfo.is_login) {
        router.push("/")
      }
    }
  }, [user.userinfo.loading])
  if(user.userinfo.loading) {
    return <></>
  }
  return (
    <OnlyUserLayout>
    <MainLayout category="마이페이지" white>
      <Profile>
        <div className='username'>{info.fullname} 님</div>
        <div className='email'>{info.email}</div>
      </Profile>
      <section>
        <SplitView>
          <div>
            <div className='title'>저장내역</div>
            <div className='count'>2,102</div>
          </div>
          <div>
            <div className='title'>찜 내역</div>
            <div className='count'>3</div>
          </div>
          <div>
            <div className='title'>1:1 문의</div>
            <div className='count'>1</div>
          </div>
        </SplitView>
        <Menu>
          <div onClick={() => router.push("/user/history/")}>
            <div>저장내역</div>
            <div className='label'>2,120</div>
          </div>
          <div onClick={() => router.push("/styles/history/")}>
            <div>스타일 추천 History</div>
            <div className='label'>2</div>
          </div>
          <div onClick={() => router.push("/user/like/")}>
            <div>찜내역</div>
            <div className='label'>322</div>
          </div>
          <div onClick={() => router.push("/contact/")}>
            <div>문의하기</div>
            <div className='label'>2</div>
          </div>
          <div onClick={() => router.push("/user/password/reset")}>
            <div>비밀번호 재설정</div>
          </div>
          <div onClick={logout}>
            <div>로그아웃</div>
          </div>
        </Menu>
      </section>
    </MainLayout>
    </OnlyUserLayout>
  )
}
