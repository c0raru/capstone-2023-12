/*
  @page        : /shop/address
  @description : 
*/
import MainLayout from "src/layouts/MainLayout";
import { ItemList } from "src/components/styles";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useNotice } from "src/hooks/NoticeContext";
import { useEffect, useState } from "react";
import { responseMessage } from "utils";
import Moment from "react-moment";
import styled from "styled-components";
import { Checkbox } from "src/components/input";
import { Label } from "src/components/styles";
import { Input } from "src/components/input";
import { Button } from "src/components/button";
import DaumPostcode from 'react-daum-postcode';
import OnlyUserLayout from "src/layouts/OnlyUserLayout";

const SplitView = styled.div`
    display: flex;
    button {
        margin: 0px;
        font-size: 14px !important;
        height: 48px;
        margin-left: 5px;
        width: 200px;
    }
`

export default function ShopOrderAddress() {
  const router = useRouter();
  useEffect(() => {}, []);

  const [form, setForm] = useState({})
  const update = (name, value) => {
    form[name] = value
    setForm({...form})
  }

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    update("zipcode", data.zonecode)
    update("address", fullAddr)
    setIsOpenPost(false);
  };

  return (
    <OnlyUserLayout>
    <MainLayout category="배송지 추가">
        <section>
            <Label>성명</Label>
            <Input placeholder="이름을 입력해주세요." value={form.name} onChange={e => update("name", e.target.value)}/>
            <Label>휴대전화번호</Label>
            <Input placeholder="휴대폰번호를 입력해주세요." type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={form.phone} onChange={e => update("phone", e.target.value)}/>
            <Label>주소</Label>
            {
                isOpenPost && (
                    <DaumPostcode
                        style={{
                            display: 'block',
                            position: 'fixed',
                            top: '72.5px',
                            left: '0px',
                            width: '100vw',
                            height: 'calc(100vh - 72.5px)',
                            borderTop: "1px solid #eee"
                        }}
                        autoClose
                        onComplete={onCompletePost}
                    />
                )
            }
            <SplitView>
                <Input placeholder="우편번호" disable readOnly value={form.zipcode} onClick={() => setIsOpenPost(true)}/>
                <Button onClick={() => setIsOpenPost(true)}>우편번호 검색</Button>
            </SplitView>
            <Input placeholder="주소를 입력해주세요." disable readOnly value={form.address}/>
            <Input placeholder="(옵션) 상세주소를 입력해주세요." value={form.detail} onChange={e => update("detail", e.target.value)}/>
        </section>
        <section className="bottom">
            <Button point>추가하기</Button>
        </section>
    </MainLayout>
    </OnlyUserLayout>
  );
}
