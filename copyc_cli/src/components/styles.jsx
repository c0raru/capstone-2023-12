import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const Center = styled.div`
    text-align: center;
    margin: 8px 0px;
`

export const Label = styled.div`
    font-size: 14px;
    line-height: 20px;
    color: #424242;
    margin: 8px 0px;
`

export const ImageContents = styled.div`
  background-image: url('http://localhost:3000/mainphoto.jpg');
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-position: center center;
  background-size: cover;
  color: #fff;
`

export const ImageBannerContents = styled(ImageContents)`
  padding: 25px;
  height: 340px;
  > div {
    &:first-child {
      margin-top: auto;
    }
    &:nth-child(1) {
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      color: #FFFFFF;
    }
    &:nth-child(2) {
      margin-top: 8px;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #FFFFFF;
    }
    &:nth-child(3) {
      margin-top: 8px;
      font-size: 14px;
      line-height: 20px;
      color: #FFFFFF;
    }
  }
`

export const ImageThumbnail = styled(ImageContents)`
    width: 100%;
    padding-top: 100%;
`

const StyledLabelMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 12px;
    .title {
        font-weight: bold;
        font-size: 20px;
        line-height: 28px;
        color: #212121;
    }
    .subtitle {
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        color: #212121;
    }
`

export const LabelMenu = (props) => {
    return (
        <StyledLabelMenu>
            <div className="title">{props.title}</div>
            <div>
                {props.subtitle}
                <Icon name="chevron right"/>
            </div>
        </StyledLabelMenu>
    )
}

export const SquareImage = styled(ImageContents)`
  padding-top: 100%;
  border-radius: 0px;  
`