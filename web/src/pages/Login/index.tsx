import { useState } from "react";
import axios from "axios";
import  UseLogStore  from "../../store/user";
import  TokenStore  from "../../store/token";
import  LogStore  from "../../store/log";
import "./index.css";

let math1 = Math.random().toString(36).slice(2, 7);
let math_end1 = Math.random().toString(36).slice(2, 7);
let math2 = Math.random().toString(36).slice(2, 7);
let math_end2 = Math.random().toString(36).slice(2, 7);
//console.log(u.substring(5,).slice(0, -5));

function Login() {
  //const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [psd, setPsd] = useState("");
  const [login, setLogin] = useState(false);

 const menber = (e:any) => {
e.preventDefault();
LogStore.setState({
	log: true
	});
	
	window.location.href = "/home";}
	
	
 const handleSubmit = (e:any) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        username,
        psd,
      },
    };
    
    // make the API call
    axios(configuration)
      .then((result) => {
        //alert("Funcionar");
        //console.log(result)
        let us = username;
        let u = `${math1}` + username + `${math_end1}`;
        let p = `${math2}` + psd + `${math_end2}`;
        let t = result.data.token;	
	
	UseLogStore.setState({
	user: u,
  	psd: p
	});
	
	TokenStore
	
	TokenStore.setState({
	token: t
	});
	
	LogStore
	
	LogStore.setState({
	log: true
	});
	
	window.location.href = "/home";
	
	//const paw = UseLogStore.getState()
	//console.log (paw);
	
      })
      .catch((error) => {
        error = new Error();
      });
      
   }   
  return (
    <div className="body">
      <div id="frame-login">
          <p>Login</p>
          
          <form method="post" onSubmit={(e)=>handleSubmit(e)}>
          
          <label>Nome de Usuário:</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de Usuário"
            aria-label="Informe o seu usuário"
            aria-required="true"
            required
          />
          <br/>
          
          <label>Senha:</label><br/>
          <input 
            type="password"
            name="psd"
            autoComplete="psd"
            value={psd}
            onChange={(e) => setPsd(e.target.value)}
            placeholder="Senha"
            aria-label="Informe a sua senha aqui"
            aria-required="true"
            required
          />
          <br/>
         
          
          <button type="submit" onClick={(e) => handleSubmit(e)} >Entrar</button>
          
          </form>
         <br/>
      
      
      {UseLogStore.getState().user != "" && TokenStore.getState() ? (
           <button id="btn-remember" onClick={(e) => menber(e)}>Entrer {UseLogStore.getState().user.substring(5,).slice(0, -5)}</button>
        ) : (
        	<div></div>
        )}
      
          
      </div>
    </div>
  )
}

export default Login;
