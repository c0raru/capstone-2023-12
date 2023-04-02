import styled from "styled-components"

const Component = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    display: flex;
    section {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bottom {
        margin-top: auto;
    }
`

const Header = styled.header`
    padding-top: 60px;
    padding-bottom: 40px;
`

const Title = styled.div`
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    color: #212121;
`

const Subtitle = styled.div`
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    color: #616161;
`

export default function TitleSubtitleLayout(props) {
    return (
        <Component>
            <Header>
                <Title>{props.title}</Title>
                <Subtitle>{props.subtitle}</Subtitle>
            </Header>
            <section>
                {props.children}
            </section>
        </Component>
    )
}