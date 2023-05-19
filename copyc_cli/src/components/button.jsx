import { Icon } from "semantic-ui-react";
import styled, { css } from "styled-components";

export const Button = styled.button`
    padding: 16px;
    background: #212121;
    border-radius: 8px;
    width: 100%;
    border: 0px solid;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    margin: 8px 0px;
    ${props => {
        if(props.inversed) {
            return css`
                color: #000;
                background: #FFFFFF;
                border: 1px solid #E0E0E0;
                box-sizing: border-box;
                border-radius: 8px;
            `
        }
        if(props.point) {
            return css`
                background: #7A60FF;
            `
        }
        return css`
        `
    }}
`

const StyledSplitTextButton = styled.div`
    display: flex;
    justify-content: center;
    margin: 8px 0px;
    >div::after {
        content: "";
        display: inline-block;
        height: 10px;
        width: 1px;
        margin: 0px 5px;
        background-color: #727272;
    }
    >div:last-child::after {
        display: none;
    }
`

export const SplitTextButton = ({items,}) => {
    return (
        <StyledSplitTextButton>
            {
                items.map(item => {
                    return (
                        <div onClick={item.onClick}>
                            {item.name}
                        </div>
                    )
                })
            }
        </StyledSplitTextButton>
    )
}

export const CheckButton = styled.button`
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #212121;
    ${props => {
        if(props.active) {
            return css`
                border: 1px solid #7A60FF;            
            `
        }
        return css``
    }}
`

export const CheckButtonGroup = styled.div`
  display: flex;
  &>button {
    margin-left: 8px;
    &:first-child {
      margin-left: 0px;
    }
  }
`

const StyledLinkButton = styled.button`
    background: #727272;
    border-radius: 12px;
    height: 72px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    line-height: 23px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
`
export const LinkButton = (props) => {
    return (
        <StyledLinkButton {...props}>
            <div>{props.children}</div>
            <div><Icon name="chevron right"/></div>
        </StyledLinkButton>
    )
}