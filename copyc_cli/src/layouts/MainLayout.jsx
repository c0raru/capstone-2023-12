import { Icon, Input } from "semantic-ui-react"
import styled from "styled-components"


const Component = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    display: flex;
    header {
        background: #F5F5F5;
        box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(27.1828px);
        padding: 26px 16px 10px 16px;
        .top {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            .category {
                font-weight: bold;
                font-size: 24px;
                line-height: 24px;
                color: #212121;
            }
            .icons {
                margin-left: auto;
                display: flex;
                font-size: 20px;
                >div {
                    margin-left: 8px;
                    width: 40px;
                    height: 40px;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 40px;
                    i {
                        margin: 0px;
                    }
                }
            }
            .menu {
                margin-left: 16px;
                font-size: 26px;
            }
        }
    }
    section {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bottom {
        margin-top: auto;
    }
`

const SearchInput = styled(Input)`
    input {
        background: #E0E0E0 !important;
    }
    border-radius: 10px;
`

export default function MainLayout(props) {
    return (
        <Component style={{
            ...(props.category) ? {backgroundColor: "#f5f5f5"} : {}
            ,
            ...(props.inversed) ? {backgroundColor: "#f5f5f5"} : {}
        }}>
            <header style={{
                ...(props.category) ? {backgroundColor: "#ffffff"} : {}
                ,
                ...(props.inversed) ? {backgroundColor: "#ffffff"} : {}
            }}>
                <div className="top" style={{...(props.category || props.removeSearch) ? {marginBottom: "10px"} : {}}}>
                    
                    <div className="icons">
                    {
                        (!props.category) && (
                            <>
                                <div><Icon name="heart outline"/></div>
                                <div><Icon name="bell outline"/></div>
                            </>
                        )
                    }
                    </div>
                    <div className="menu"><Icon name="bars"/></div>
                </div>
                {
                    (!props.category && !props.removeSearch) && (
                        <div>
                            <SearchInput icon="search" iconPosition="left" fluid placeholder="Search" clearable/>
                        </div>
                    )
                }
            </header>
            {props.children}
        </Component>
    )
}