import { Icon, Input } from "semantic-ui-react";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "src/hooks/UserContext";

const Component = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  display: flex;
  header {
    background: #f5f5f5;
    box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(27.1828px);
    padding: 26px 16px 10px 16px;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      .category {
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        color: #212121;
      }
      .icons {
        margin-left: auto;
        display: flex;
        font-size: 20px;
        > div {
          margin-left: 8px;
          width: 40px;
          height: 40px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 40px;
          i {
            margin: 0px;
          }
        }
      }
      .menu {
        margin-left: 16px;
        font-size: 26px;
      }
    }
  }
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .bottom {
    margin-top: auto;
  }
  .sticky {
    position: fixed;
    bottom: 0px;
    width: 100%;
    max-width: 500px;
    height: auto;
  }
`;

const SearchInput = styled(Input)`
  input {
    background: #e0e0e0 !important;
  }
  border-radius: 10px;
`;

const StyledMenu = styled.div`
    position: fixed;
    top: 0px;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    display: flex;
    flex-direction: row-reverse;
    background-color: rgba(0, 0, 0, 0.5);
    ${props => {
        if(props.isOpen) {
            return css`
                right: 0px;
            `
        }
        return css`
            right: -100vw;
        `
    }}
`

const Menu = (props) => {
    const close = (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onClose()
    }
    return (
        <StyledMenu onClick={close} isOpen={props.isOpen}>
            {props.children}
        </StyledMenu>
    )
}

const MenuBackground = styled.div`
    width: 320px;
    height: 100%;
    background-color: #fff;
    transition: 500ms;
    position: fixed;
    ${props => {
        if(props.isOpen) {
            return css`
                right: 0px;
            `
        }
        return css`
            right: -320px;
        `
    }}
    .username {
        font-weight: bold;
        font-size: 32px;
        line-height: 46px;
        color: #212121;
        margin-bottom: 10px;
        display: flex;
        >div:first-child {
          margin-right: auto;
        }
    }
    .text_buttons {
        display: flex;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #757575;
        >div {
            margin-right: 10px;
        }
    }
    >div {
        padding: 18px 16px;
    }
    .splitButton {
        padding: 0px;
        display: flex;
        >div {
            width: 50%;
            font-weight: bold;
            font-size: 18px;
            line-height: 26px;
            text-align: center;
            color: #212121;
            padding: 40px 0px;
            border: 1px solid #eee;
            &:first-child {
                border-left: 0px;
                border-right: 0px;
            }
            &:last-child {
                border-right: 0px;
            }
        }
    }
    .menu {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #757575;
        >div {
            margin-top: 10px;
            &.title {
                margin-bottom: 10px;
                font-weight: bold;
                font-size: 18px;
                line-height: 26px;
                color: #212121;
                margin-top: 24px;
                &:first-child {
                    margin-top: 0px;
                }
            }
        }
    }
`

export default function MainLayout(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("")
  const router = useRouter()
  const user = useUser()
  const search = () => {
    router.push("/shop/search/" + encodeURIComponent(query))
  }
  useEffect(() => {
    if(!router.isReady) return
    setQuery(router.query.query)
  }, [router.isReady])
  return (
    <>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuBackground isOpen={isOpen}>
            {
              user?.userinfo?.is_login ? (
                <div>
                    <div className="username">
                      <div>{user.userinfo.data.fullname} 님</div>
                      <div onClick={() => router.push("/user/")} style={{cursor: "pointer"}}><Icon name="user"/></div>
                    </div>
                    <div className="text_buttons">
                        <div>{user.userinfo.data.email}</div>
                    </div>
                </div>
              ) : (
                <div>
                    <div className="username">로그인하세요</div>
                    <div className="text_buttons">
                        <div><Link href="/user/signin">로그인 &gt;</Link></div>
                        <div><Link href="/user/signup">회원가입 &gt;</Link></div>
                    </div>
                </div>
              )
            }
            <div className="splitButton">
                <div onClick={() => router.push("/")}>홈</div>
                <div onClick={() => router.push("/user/like")}>찜</div>
            </div>
            <div className="menu">
                <div className="title">About</div>
                <div onClick={() => router.push("/pages/notice")}>COPYC</div>
                <div onClick={() => router.push("/notice")}>공지사항</div>

                <div className="title">My page</div>
                <div onClick={() => router.push("/user/history")}>구매내역</div>
                <div onClick={() => router.push("/user/like")}>찜</div>
                <div onClick={() => router.push("/contact")}>문의하기</div>
                <div onClick={() => router.push("/user/password/reset")}>비밀번호 재설정</div>

            </div>
        </MenuBackground>
      </Menu>
      <Component
        style={{
          ...((props.category || props.inversed) && !props.white
            ? { backgroundColor: "#f5f5f5" }
            : {}),
          ...(props.point ? { backgroundColor: "#7A60FF" } : {}),
        }}
      >
        <header
          style={{
            ...(props.category ? { backgroundColor: "#ffffff" } : {}),
            ...(props.inversed ? { backgroundColor: "#ffffff" } : {}),
          }}
        >
          <div
            className="top"
            style={{
              ...(props.category || props.removeSearch
                ? { marginBottom: "10px" }
                : {}),
            }}
          >
            <div>
              {props.category ? (
                <div className="category">{props.category}</div>
              ) : (
                <Link href="/">
                  <img src="/public/logo.ico" />
                </Link>
              )}
            </div>
            <div className="icons">
              {!props.category && (
                <>
                  <Link href="/user/like">
                    <div>
                      <Icon name="heart outline" />
                    </div>
                  </Link>
                  <Link href="/notice">
                    <div>
                      <Icon name="bell outline" />
                    </div>
                  </Link>
                  <Link href="/shop/cart">
                    <div>
                      <Icon name="cart" />
                    </div>
                  </Link>
                </>
              )}
            </div>
            {
              (!props.removeMenu) && (
                <div className="menu" onClick={() => setIsOpen(true)}>
                  <Icon name="bars" />
                </div>
              )
            }
          </div>
          {!props.category && !props.removeSearch && (
            <div>
              <SearchInput
                icon="search"
                iconPosition="left"
                fluid
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={e => (e.charCode == 13) && search()}
              />
            </div>
          )}
        </header>
        {props.children}
      </Component>
    </>
  );
}
