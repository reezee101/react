import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'  //useSelector : store에 있는 state 가져올 수 있음 
import { countPlus, changeName } from './../store.js'

function Cart() {

    let store = useSelector((state) => {  //store 가져오는 함수 
        return state
    })

    let dispatch = useDispatch()   //import 한 changeName 함수를 쓰기 위해 필요함 
                                    //(store.js에 요청을 보내주는 함수 )

    return (<div> 
        {store.user.name}님의 장바구니입니닷
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