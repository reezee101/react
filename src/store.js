import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',  //state 이름
    initialState : 'lee', //값
    reducers : {    //state 수정 함수 
        changeName(state){  //(state) : 기존 state = lee
            return 'kim 일까 ' + state  + '일까'
        }
    } 
})

//함수 export 
export let {changeName} = user.actions

let stock = createSlice({
    name : 'stock',  //state 이름
    initialState : [7,7,7] //값 
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        countPlus(state, a){
            return state[a.payload].count += 1;
        }
    }
})
export let {countPlus} = cart.actions


export default configureStore({
    reducer : {
     user : user.reducer,
     stock : stock.reducer, 
     cart : cart.reducer
    }
})