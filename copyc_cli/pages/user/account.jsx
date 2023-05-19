/*
  @page        : /user/account
  @description : 계정 정보를 보여주는 페이지
*/
import MainLayout from 'src/layouts/MainLayout'
import OnlyUserLayout from 'src/layouts/OnlyUserLayout'
import styled from 'styled-components'

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  th, td {
    height: 50px;
    border-bottom: 1px solid #d6d6d6;
  }
  tbody th {
    width: 120px;
    text-align: left;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #424242;
  }
  tbody td {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #212121;
    text-align: left;
  }
`

export default function Best() {
  return (
    <OnlyUserLayout>
    <MainLayout category="계정 정보">
      <section>
        <Table>
          <tbody>
            <tr>
              <th>성명</th>
              <td>홍길동</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>1992-12-12</td>
            </tr>
            <tr>
              <th>성별</th>
              <td>남성</td>
            </tr>
            <tr>
              <th>아이디</th>
              <td>d891hd19d</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>email@gmail.com</td>
            </tr>
            <tr>
              <th>휴대전화번호</th>
              <td>010-12**-12**</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </MainLayout>
    </OnlyUserLayout>
  )
}
