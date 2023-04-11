import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'  //useSelector : store에 있는 state 가져올 수 있음 
import { countPlus, changeName } from './../store.js'
import { memo, useMemo, useState } from 'react';

let Child = memo (function(){                   //memo() 로 감싸면 부모컴포넌트가 렌더링 될 때 자식컴포넌트까지 자동으로 렌더링되지않고 필요한 시점에만 렌더링됨 (props 가 변하는 시점에만)
    return (<div> 자식 
        {console.log('재랜더링-> 성능저하 위험')}
    </div>)
})

function 함수(){
    //반복문 10억번 
}

function Cart() {

    let store = useSelector((state) => {  //store 가져오는 함수 
        return state
    })

    let dispatch = useDispatch()   //import 한 changeName 함수를 쓰기 위해 필요함 
                                    //(store.js에 요청을 보내주는 함수 )

    let [cnt, cntPlus] = useState(0);

    let result = useMemo(()=>{
        return 함수();
    }, [store])  //소요시간이 긴 로직은 cart 컴포넌트가 렌더링될 때 한번만 실행되고 재렌더링하지않음, [state]가 변할때만 실행           
                //useEffect : html 코드 로드 후 실행
                //useMemo : 컴포넌트 렌더링될 때 실행

    return (<div> 
        {store.user.name}님의 장바구니입니닷
        {/* Child로 전송되는 cnt props가 변하므로 memo로 감싸도 재렌더링됨 : 기존props와 현재 props의 값을 계속 비교하므로 남발하면 안됨(props가 복잡한 경우) */}
        <Child cnt={cnt}></Child>  
        <Button onClick={()=>{
            cntPlus(cnt+1)
            console.log(cnt)
        }}>plus</Button>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    store.cart.map((a, i) => {
                        return (
                            <tr key={i}>
                                <td>{store.cart[i].id}</td>
                                <td>{store.cart[i].name}</td>
                                <td>{store.cart[i].count}</td>
                                <td onClick={()=>{
                                    dispatch(countPlus(store.cart[i].id))
                                }}><button>+</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <button onClick={()=>{
                console.log(dispatch(changeName()));
            }}>change</button>
        </Table>

    </div >)
};

export default Cart;