import styled from "styled-components";

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
        background-color: #BDBDBD;
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