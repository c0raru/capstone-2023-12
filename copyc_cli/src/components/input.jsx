import Link from "next/link";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { css } from "styled-components";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px;
  color: #757575;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 24px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 16px;
  ${(props) => {
    if (props.active) {
      return css`
        font-size: 13px;
        background: #212121;
        color: #fff;
        border: 1px solid #212121;
        > * {
          position: relative;
          top: -2px;
        }
      `;
    }
    return {};
  }}
`;

export function Checkbox(props) {
  return (
    <StyledCheckbox active={props.active || false} onClick={props.onClick}>
      {props.active && <Icon name="checkmark" />}
    </StyledCheckbox>
  );
}

const StyledMultiCheckbox = styled.div`
  .header {
    display: flex;
    & > div:first-child {
      margin-right: 5px;
    }
    .title {
      font-weight: bold;
    }
    .description {
      font-size: 12px;
      line-height: 17px;
      color: #616161;
    }
    border-bottom: 1px solid #edf1f5;
    margin-bottom: 24px;
    padding-bottom: 24px;
  }
  .option {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    color: #292e33;
    margin-bottom: 24px;
    & > div:first-child {
      margin-right: 5px;
    }
    & > div:nth-child(2) {
      &:hover {
        cursor: pointer;
      }
    }
    & > div:last-child {
      margin-left: auto;
      a {
        text-decoration: underline;
      }
    }
  }
`;

export function MultiCheckbox(props) {
  return (
    <StyledMultiCheckbox>
      <div className="header">
        <div>
          <Checkbox active={true} />
        </div>
        <div>
          <div className="title">모두 동의합니다.</div>
          <div className="description">
            전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
            <br />
            개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한
            <br />
            동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
          </div>
        </div>
      </div>
      <div>
        {props.options.map((item, idx) => {
          return (
            <div className="option">
              <div>
                <Checkbox active={item.is_active} onClick={() => props.onClick(idx)}/>
              </div>
              <div onClick={() => props.onClick(idx)}>{item.text}</div>
              <div>
                <Link href={item.url}>약관보기</Link>
              </div>
            </div>
          );
        })}
      </div>
    </StyledMultiCheckbox>
  );
}

export const Datepicker = styled(DatePicker)`
  width: 100%;
  height: 48px;
  padding: 16px;
  font-size: 12px;
  line-height: 24px;
  color: #757575;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Textarea = styled.textarea`
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 12px;
  line-height: 24px;
`;


const StyledCounter = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  height: 28px;
  >div {
    input {
      width: 50px;
      height: 100%;
      border: 0px;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      outline: none;
      text-align: center;
    }
    &:first-child, &:last-child {
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const Counter = (props) => {
  const min = 1
  const [value, setValue] = useState(Math.max(props.value || 1, 1))
  const inc = () => {
    setValue(value + 1)
  }
  const dec = () => {
    if(value <= min) {
      return
    }
    setValue(value - 1)
  }
  // useEffect(() => {
  //   if(props.value) {
  //     setValue(props.value)
  //   }
  // }, [props.value])
  useEffect(() => {
    props.onChange && props.onChange(value)
  }, [value])
  return (
    <StyledCounter>
      <div onClick={dec}>
        <Icon name="angle left"/>
      </div>
      <div>
        <input value={value} onChange={e => setValue(e.target.value)}/>
      </div>
      <div onClick={inc}>
        <Icon name="angle right"/>
      </div>
    </StyledCounter>
  )
}
