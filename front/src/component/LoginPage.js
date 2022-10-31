import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

export default function LoginPage(){
  const navigate = useNavigate();

  const token = useSelector((state) => state.UserInfo.accessToken); // redux 상태관리
  const [value, setValue] = useState(0); // 변하면 재렌더링되는 변수들

  const ClickLoginBtn = ()=>{
    navigate("/mainpage");
  }
  const ClickPlus = ()=>{
    setValue(value+1); // useState로 선언된 변수들은 변하면 자동으로 re-rendering됨
  }

  useEffect(()=>{ // [] 안에 들어가 있는게 변경되면 실행(re-rendering), 처음에도 실행(created)
    console.log("rendering start..");
  }, [])
  return(
    <div>
      <button onClick={ClickLoginBtn}>Login Btn</button>
      <button onClick={ClickPlus}>{value}</button>
      <h2>Token : {token}</h2>
    </div>
  );
}