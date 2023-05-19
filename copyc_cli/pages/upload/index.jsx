import { Button, Grid, Icon, Input } from "semantic-ui-react";
import MainLayout from "src/layouts/MainLayout";
import styled, { css } from "styled-components";
import {useDropzone} from 'react-dropzone'

import step_1 from "./step_1.svg";
import step_2 from "./step_2.svg";
import step_3 from "./step_3.svg";
import { useCallback, useEffect, useState } from "react";

const StepImage = styled.img`
  width: 75px;
`

const Styled = styled.div`
  text-align: center;
  padding: 50px 0px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 27px;
  line-height: 35px;
  text-align: center;
  color: #212121;
  margin-top: 25px;
`

const Subtitle = styled.div`
  margin-top: 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #616161;
`

const CategoryTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #292E33;
  width: 100%;
  text-align: left;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .value {
    font-weight: 400;
    font-size: 15px;
  }
  ${props => {
    if(props.underline) {
      return css`
        border-bottom: 1px solid #ddd;
        padding: 16px;
        `
    } else {
      return css`
        padding: 16px 0px;
      `
    }
  }}
`

const Thumbnail = styled.div`
  ${props=> {
    return css`
      background-image: url(${props.image});
      height: 100px;
      background-size: cover;
      border: 1px solid #555;
    `
  }}
`

const Categories = styled.div`
  margin: 30px 0px 60px 0px;
  >div {
    font-size: 20px;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #292E33;
    text-align: left;
    padding: 20px;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
    }
  }
`

const FileUpload = styled.div`
  height: 300px;
  border: 5px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

export default function Upload() {

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const [step, setStep] = useState(0);

  const subtitles = [
    "등록하실 이미지의 카테고리를 선택해주세요.",
    "이미지의 이름과 이미지 정보를 입력해주세요.",
    "이미지를 업로드해주세요.",
  ]

  const categories = ["숲 / 나무", "바닷가 / 휴양지", "학교", "회사", "인물", "집", "가구", "음식"];

  const nextHandler = () => {
    setStep(step+1);
  }

  const submitHandler = () => {
    
  }

  const Textarea = styled.textarea`
    width: 100%;
    height: 300px;
    padding: 20px;
    outline: none;
    font-size: 15px;
  `

  const top_step = [step_1, step_2, step_3];

  return (
    <MainLayout>
      <Styled>
        <StepImage src={top_step[step].src}/>
        <Title>업로드 하기</Title>
        <Subtitle>{subtitles[step]}</Subtitle>
        {
          step === 0 && (
            <>
              <CategoryTitle underline>
                <span>카테고리 선택</span>
              </CategoryTitle>
              <Categories>
              {
                categories.map(category => {
                  return (
                    <div>{category}</div>
                  )
                })
              }
              </Categories>
              <br/>
              <Button fluid color="grey" style={{fontSize: 20, height: 80 }} onClick={nextHandler}>다음</Button>
            </>
          )
        }
        {
          step === 1 && (
            <>
              <div>
                <CategoryTitle underline>
                  <span>카테고리 선택</span>
                  <span className="value">(선택한 카테고리)</span>
                </CategoryTitle>
                <CategoryTitle>
                  <span>이미지 이름</span>
                </CategoryTitle>
                <div>
                  <Input placeholder="이미지 이름을 입력해주세요." fluid style={{fontSize: 20, marginTop: 5}}/>
                </div>
                <CategoryTitle>
                  <span>이미지 정보</span>
                </CategoryTitle>
                <div>
                  <Textarea placeholder="이미지 정보를 입력해주세요."/>
                </div>
              </div>
              <br/>
              <Button fluid color="grey" style={{fontSize: 20, height: 80}} onClick={nextHandler}>다음</Button>
            </>
          )
        }
        {
          step === 2 && (
            <div>
              <CategoryTitle>
                <span>이미지 업로드</span>
              </CategoryTitle>
              <FileUpload {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files.</p>
              </FileUpload>
              <br/>
              <Grid columns={3}>
                {
                  files.map((file) => (
                    <Grid.Column key={file.name}>
                      <Thumbnail image={file.preview}>
                        <button onClick={removeFile(file)}>Remove File</button>
                      </Thumbnail>
                    </Grid.Column>
                  ))
                }
              </Grid>
              <br/>
              <br/>
              <Button fluid color="grey" style={{fontSize: 20, height: 80}} onClick={submitHandler}>업로드 하기</Button>
            </div>
          )
        }
      </Styled>
      <footer>
      </footer>
    </MainLayout>
  )
}
