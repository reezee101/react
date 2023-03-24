import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, countPlus } from './../store.js'

function Cart() {

    let store = useSelector((state) => {  //store 가져오는 함수 
        return state
    })
    console.log(store)
    let dispatch = useDispatch()   //import 한 changeName 함수를 쓰기 위해 필요함 
                                    //(store.js에 요청을 보내주는 함수 )

    return (<div>
        {store.user}의 장바구니 입니다! 
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
                                    dispatch(countPlus(i))
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