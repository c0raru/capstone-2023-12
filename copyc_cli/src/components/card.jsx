import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { ImageThumbnail } from "./styles";

const StyledCard = styled.div`
    .title {
        font-size: 15px;
        color: #212121;
        margin-top: 15px;
    }
    .category {
        font-size: 13px;
        color: #757575;
        margin-top: 8px;
        margin-bottom: 5px;
        >span {
            &:nth-child(2) {
                display: inline-block;
                width: 1px;
                height: 10px;
                background-color: #757575;
                margin: 0px 5px;
            }
        }
    }

    .heart {
        font-size: 24px;
        text-align: right;
        position: absolute;
        color: #fff;
        margin-top: 8px;
        margin-left: 5px;
    }

`

export const Card = (props) => {
    return (
        <StyledCard>
            <div className="heart"><Icon name="heart outline"/></div>
            <ImageThumbnail/>

            <div className="title">
                바다가 보이는 카페 이미지(Ocean View Cafe Image)
            </div>
            <div className="category">
                <span>Username</span>
                <span></span>
                <span>Category</span>
            </div>
        
        </StyledCard>
    )
}