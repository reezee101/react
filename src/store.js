// redux 사용 이유 : 
//컴포넌크 간 state 공유가 편해짐 (props 를 거치지 않아도 됨)

import { configureStore, createSlice } from "@reduxjs/toolkit";

let stock = createSlice({
    name: 'stock',  //state 이름
    initialState: [7, 7, 7] //값 
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],

    reducers: {    //state 수정함수(수정시 호출해야 값 수정 가능하므로 버그추적이 쉬움)
        countPlus(state, action) { 
            let id = state.findIndex((a)=>{
                return a.id == action.payload;
            })
            state[id].count++;
        },
        cartPlus(state, a){
            state.push(a.payload);
        }
    }
})

//state 생성 
let user = createSlice({
    name: 'user',  //state 이름
    initialState: { name: 'lee', age: 29 }, //값
    reducers: {    //state 수정 함수 
        changeName(state, a) {  //(state) : 기존 state = lee
            //state가 array, object 일 경우 return 필요 x 
            //return  {name : 'lee??', age : 29}
            state.name = 'lee><';
            state.age += a.payload; //파라미터 넣을 땐 payload 필수 
        }
    }
})
//state 수정함수 export
export let { countPlus } = cart.actions
export let { cartPlus } = cart.actions
export let { changeName } = user.actions


//state 등록
export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer
    }
})