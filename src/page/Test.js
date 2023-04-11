import { useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux'  //useSelector : store에 있는 state 가져올 수 있음 

let a = new Array(10000).fill(0);

function Test() {

    let [name, setName] = useState('');
    //console.log(name)
    let [isPending, startTransition] = useTransition();
    
    return (
        <div>입력해보든가 
            <input onChange={(e)=>{
                startTransition(()=>{   //성능저하를 일으키는 함수를 startTransition()로 감싸줌 : 코드시작시점을 늦춰주므로 성능향상 가능 
                    setName(e.target.value)
                })
            }}/>
            {
            isPending ? '로딩중' :      //startTransition 작업중이면 isPending은 true
            a.map(()=>{
                return <div>{name}</div>
            })}
            </div>

    )
};

export default Test;