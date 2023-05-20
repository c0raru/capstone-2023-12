import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { ImageThumbnail } from "./styles";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment'
import { useRouter } from "next/router";
import { useState } from "react";
import { useProduct } from "src/hooks/ProductContext";
import { responseMessage } from "utils";
import { useEffect } from "react";

const StyledCard = styled.div`
  .title {
    font-size: 15px;
    color: #212121;
    margin-top: 15px;
    text-overflow: ellipsis;
    overflow: hidden; 
    height: 1.2em; 
    white-space: nowrap;
  }
  .category {
    font-size: 13px;
    color: #757575;
    margin-top: 8px;
    margin-bottom: 5px;
    > span {
      &:nth-child(2) {
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: #757575;
        margin: 0px 5px;
      }
    }
  }
  .price {
    font-weight: bold;
    font-size: 18px;
    color: #212121;
  }
  .heart {
    font-size: 24px;
    text-align: right;
    position: absolute;
    color: #fff;
    margin-top: 8px;
    margin-left: 5px;
  }
  .date {
    line-height: 14px;
    color: #ffffff;
    background: #313131;
    border-radius: 50px;
    padding: 4px 8px;
    display: inline-block;
    position: absolute;
    margin-left: 5px;
    margin-top: -30px;
  }
`;

export const Card = (props) => {
  const router = useRouter()
  const product = useProduct()
  const [isLike, setIsLike] = useState(false)

  const likeHandler = (e) => {
    responseMessage(isLike ? product.dislike(props.id) : product.like(props.id))
    .then(()=> {
      setIsLike(!isLike)
    })
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    product.is_like(props.id).then(({data}) => {
      setIsLike(data.is_like)
    })
  }, [])

  return (
    <StyledCard onClick={() => {[
      router.push("/detail/" + props.id)
    ]}}>
      <div className="heart">
        {
          isLike ? (
            <Icon name="heart" color="red" onClick={likeHandler} />
            ) : (
            <Icon name="heart outline" onClick={likeHandler} />
          )
        }
      </div>
      <ImageThumbnail image={props.thumbnail}/>
      <div className="date">
        <Moment format="MM.DD">{props.date}</Moment>
      </div>
      <div className="title">{props.name}</div>
      <div className="category">
        <span>{props.category.name}</span>
      </div>
      <div className="price">
        {parseInt(props.price).toLocaleString()} coin
      </div>
    </StyledCard>
  );
};

export const CardItems = (props) => {
  const items = props.items || [];
  return (
    <Grid columns={2}>
      {items.map((item) => {
        return (
          <Grid.Column>
            <Card {...item} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};
