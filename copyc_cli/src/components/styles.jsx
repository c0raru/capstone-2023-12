import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import styled, { css } from "styled-components";

export const Center = styled.div`
  text-align: center;
  margin: 8px 0px;
`;

export const Label = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #424242;
  margin: 8px 0px;
`;

export const ImageContents = styled.div`
  ${props => {
    return css`
      background-image: url(${props.image || "/public/logo.svg"});
    `
  }}
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-position: center center;
  background-size: cover;
  color: #fff;
`;

export const ImageBannerContents = styled(ImageContents)`
  padding: 25px;
  height: 340px;
  > div {
    >span {
      background: #313131;
      display: inline-block;
      padding: 5px;
    }
    &:first-child {
      margin-top: auto;
      >span {
        background: #ff5959;
      }
    }
    &:nth-child(1) {
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
    }
    &:nth-child(2) {
      margin-top: 8px;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      >span {
        padding: 8px;
        width: 90%;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
      }
    }
    &:nth-child(3) {
      margin-top: 8px;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;

export const ImageThumbnail = styled(ImageContents)`
  width: 100%;
  padding-top: 100%;
`;

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
`;

export const LabelMenu = (props) => {
  const router = useRouter();
  return (
    <StyledLabelMenu>
      <div className="title">{props.title}</div>
      <div onClick={() => router.push(props.url)}>
        {props.subtitle}
        <Icon name="chevron right" />
      </div>
    </StyledLabelMenu>
  );
};

export const SquareImage = styled(ImageContents)`
  padding-top: 100%;
  border-radius: 0px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 40px;
  line-height: 36px;
  color: #212121;
  margin-bottom: 24px;
`;

export const NoticeText = styled.div`
  font-size: 12px;
  line-height: 17px;
  color: #424242;
`;

export const ItemList = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background-color: #fff;
  color: #212121;
  > div {
    padding: 16px;
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
    .highlight {
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      color: #7a60ff;
      margin-right: 5px;
    }
    .date {
      font-size: 14px;
      line-height: 16px;
      color: #bdbdbd;
      margin-top: 12px;
    }
    border-bottom: 1px solid #eee;
  }
`;

export const Tag = styled.div`
  padding: 4px 6px;
  border-radius: 100px;
  display: inline-block;
  margin-right: 5px;
  font-size: 13px;
  ${(props) => {
    const color = props.color || "#000";
    return css`
      background-color: ${color};
    `;
  }}
  color: #fff;
`;

export const SplitView = styled.div`
  .header {
    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #212121;
    }
    .date {
      margin-top: 12px;
      font-size: 14px;
      line-height: 16px;
      color: #bdbdbd;
    }
    box-shadow: 0px -1px 0px #eeeeee, 0px 1px 0px #eeeeee;
  }
  .contents {
    text-align: justify;
  }
`;

export const WarningText = styled.div`
  text-align: center;
  margin-top: 100px;
`