import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { Nav } from 'react-bootstrap';

let ColorBtn = styled.button`
    background: ${props => props.bg};
    color: black;
    padding: 10px;
`
function Detail(props) {

    let { id } = useParams();
    let [alert, setAlert] = useState(true);
    let [inputVal, setInputVal] = useState('');
    let [tab, setTab] = useState(0);


    //mount, update시 실행되는 코드(html 다 렌더링 되고 난 후 실행됨
    //                             - 어려운 연산, 서버에서 데이터 받아올 때, 타이머 사용시)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setAlert(false);
    //     }, 2000);
    // },[])    //[] 추가 후 state 입력하지 않으면 브라우저 재렌더되어도 동작하지 않음

    useEffect(() => {
        let result = setTimeout(() => {   //timer 함수를 제거할 수 있게 변수에 담기
            setAlert(false);
        }, 2000)

        return () => {    //useEffect 시작 전 동작 
            clearTimeout(result);   //브라우저 재 렌더시 쌓여있을 지 모르는 타이머함수 제거 
        }
    })

    /*
     *useEffect
     * useEffect(()=>{    })            1. 재렌더링마다 코드 실행하고 싶으면 사용
     * useEffect(()=>{    }, [  ])      2. mount 시 1회만 코드 실행하고 싶으면 빈 []추가(특정 state 변경시만 실행하려면 []안에 state명 추가 )
     * useEffect(()=>{                  3. unmount시(컴포넌트 삭제시) 1회 코드 실행하고 싶으면 return 추가 
     *                  return ()=>{
     *                              
     *                          }    
     *                        }, [  ])
     */
    useEffect(() => {
        if (isNaN(inputVal)) {
            console.log('숫자 입력 금지');
        }
    }, [inputVal])   //[inputVal] : inputVal이라는 변수가 mount 되거나 update 될 때 실행
    //빈 대괄호 : 컴포넌트 mount 되는 시점 1회만 실행 

    return (<div className="container">
        <div className="row">
            {
                alert == true ? <div className="alert alert-warning">2초 이내 구매시 할인 </div> : ''
            }
            <div className="col-md-6">
                <img src={props.title[id].img} width="100%" />
            </div>
            <input onChange={(e) => {
                setInputVal(e.target.value)
            }} ></input>

            <div className="col-md-6">
                <h4 className="pt-5">{props.title[id].title}</h4>
                <p>{props.title[id].content}</p>
                <p>{props.title[id].price} won</p>
                <button className="btn btn-danger">주문하기</button>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {
                        setTab(0);
                    }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {
                        setTab(1);
                    }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {
                        setTab(2);
                    }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContents tab={tab}></TabContents>


            {
                // tab == 0 ?  <div>내용0</div> 
                // : tab == 1 ? <div>내용1</div> 
                // : <div>내용2</div>

            }
        </div>
    </div>)
};

function TabContents({ tab }) {

    let [fade, setFade] = useState('');

    //tab state 변경될 때 마다 실행
    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )

}
export default Detail;