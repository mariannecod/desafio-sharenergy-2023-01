import React from 'react';
import { useState }from 'react';
import axios from "axios";
import create from 'zustand';
import {persist} from "zustand/middleware";
import  UseLogStore  from "../../store/user";
import  TokenStore  from "../../store/token";
import  LogStore  from "../../store/log";
import './index.css';

import ButtonMenu from "../../components/Buttons/button-menu"

import ApiUserRandom from "../../apis/api-random-user"
import ApiRandomDog from "../../apis/api-random-dog"

import Clientesdb from "../../db/clientes"

function Home() {
  document.title = "Home";

  if(UseLogStore.getState().user != "" && TokenStore.getState().token != "" && LogStore.getState().log == true)  {
  
  const DivHome = React.useRef(); 
  
  const refDiv1 = React.useRef();
  const refDiv2 = React.useRef();
  const [toogle, setToogle] = React.useState(true);

  
  React.useEffect(() => {    
    if (refDiv1.current) {
      if (toogle) {
        refDiv1.current.style.display = 'initial';
        refDiv2.current.style.display = 'none';
      } else { 
        refDiv1.current.style.display = 'none';
        refDiv2.current.style.display = 'initial';
      }
    }
  }, [toogle]);
  
  const DivCats = React.useRef();
  const [cat, setCat] = useState("100");
  const [urlcat, setUrlCat] = React.useState("https://http.cat/100");

  
  const SubmitCat = (e:any) => {
  e.preventDefault();
  let url = "https://http.cat/"
  setUrlCat(url + cat)
  }
  
  React.useEffect(() => {    
    if (DivCats.current) {
      DivCats.current.style.display = 'none';
    }
  }, []);
  
  const DivDogs = React.useRef();
  const [dogs , setDogs] = useState(true);
  
  React.useEffect(() => {    
    if (DivDogs.current) {
      DivDogs.current.style.display = 'none';
    }
  }, []);
  
  const DivContatos = React.useRef();
  
  
  const DivSair = React.useRef();
  
  React.useEffect(() => {    
    if (DivSair.current) {
      DivSair.current.style.display = 'none';
    }
  }, []);
 
   const [pgs, setPgs] = React.useState(1);
  
   React.useEffect(() => {  
        if (pgs == 1){  
        DivHome.current.style.display = 'block';
        DivCats.current.style.display = 'none';
        DivDogs.current.style.display = 'none';
        DivContatos.current.style.display = 'none';
        DivSair.current.style.display = 'none';
        console.log('Home')
        }
        if (pgs == 2)
        {
        DivCats.current.style.display = 'block';
        DivHome.current.style.display = 'none';
        DivDogs.current.style.display = 'none';
        DivContatos.current.style.display = 'none';
        DivSair.current.style.display = 'none';
        console.log('Cat')
        }
        if (pgs == 3)
        {
        DivDogs.current.style.display = 'block'; 
        DivHome.current.style.display = 'none';
        DivCats.current.style.display = 'none';
        DivContatos.current.style.display = 'none';
        DivSair.current.style.display = 'none';
        console.log('Dogs')
        }
        if (pgs == 4)
        {
        DivContatos.current.style.display = 'block';
        DivHome.current.style.display = 'none';
        DivCats.current.style.display = 'none';
        DivDogs.current.style.display = 'none'; 
        DivSair.current.style.display = 'none';
        console.log('Contatos')
        } 
        if (pgs == 5)
        {
        DivSair.current.style.display = 'block';      
        DivHome.current.style.display = 'none';
        DivCats.current.style.display = 'none';
        DivDogs.current.style.display = 'none'; 
        DivContatos.current.style.display = 'none';
        console.log('Sair')
        }      
  }, [pgs]);
 
 
   const Deslogar = (e:any) => {
  e.preventDefault();
  

       LogStore.setState({
	log: false
       });
       window.location.href = "/";

  
  }
  
  const DeslogareEsquecer = (e:any) => {
       e.preventDefault();
       
       LogStore.setState({
	log: false
       });
       
       TokenStore.setState({
	token: ""
       });
       
       UseLogStore.setState({
	user: "",
	psd: ""
       });
       
       window.location.href = "/";
     
  }
  
  const BtnAddClienteDiv = React.useRef();
  const CloseDivAddCliente = React.useRef();
  const DivAddCliente = React.useRef();
  
  const [divaddclient, setDivaddclient] = React.useState(1);
  
  React.useEffect(() => {    
    if (DivAddCliente.current) {
      DivAddCliente.current.style.border = '2px solid #c3c3c3';
      DivAddCliente.current.style.margin = '15px';
      DivAddCliente.current.style.padding = '25px';
      CloseDivAddCliente.current.style.backgroundColor = 'LightCoral';
    }
  }, []);
  
   React.useEffect(() => {  
        if (divaddclient == 1){  
        BtnAddClienteDiv.current.style.display = 'inline';
        DivAddCliente.current.style.display = 'none';
        CloseDivAddCliente.current.style.display = 'none';
        }
        if (divaddclient == 2)
        {
        DivAddCliente.current.style.display = 'inline-block';
        CloseDivAddCliente.current.style.display = 'inline';
        BtnAddClienteDiv.current.style.display = 'none';
        }
  }, [divaddclient]);
  
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [SucessoCliente, setSucessoCliente] = React.useState(false);
  const [FracassoCliente, setFracassoCliente] = React.useState(false);
  
  function cliesu () {
       setSucessoCliente(false);
  }
  
  function cliefra () {
       setFracassoCliente(false);
  }
  
  const ClientSubmit = (e:any) => {
    e.preventDefault();


    const cli = {
      method: "post",
      url: "http://localhost:3000/registerclient",
      data: {
        name,
        email,
        phone,
        location,
        cpf
      },
    };

    axios(cli)
      .then((result) => {
	
       setSucessoCliente(true)
   
       setTimeout(cliesu, 3500);
    
  
  
      })
      .catch((error) => {
        error = new Error();
        setFracassoCliente(true)
        setTimeout(cliefra, 3500);

      });
      
   }   
  
  return (
    
   
    <div className="title">
    <aside>
    <img src="https://cdn.pixabay.com/photo/2021/04/27/08/40/flash-6210947_960_720.jpg" />
    <p>Olá</p>
    <p>{UseLogStore.getState().user.substring(5,).slice(0, -5)}</p>
    
    <div id="btns">

    </div>
    </aside>
    <main>
    <div>
    	<span onClick={(e) => setPgs(1)}>
        	<ButtonMenu text={"Pagina incial"} />
        </span>
        
        <span onClick={(e) => setPgs(2)}>
        	<ButtonMenu text={"Brincando com Gatinhos"} />
        </span>
        
        <span onClick={(e) => setPgs(3)}>
        	<ButtonMenu text={"Encontrer o Cachorro"} />
        </span>
        
        <span onClick={(e) => setPgs(4)}>
        	<ButtonMenu text={"Clientes"} />
        </span>
        
        <span onClick={(e) => setPgs(5)}>
        	<ButtonMenu text={"Sair"} />
        </span>
    </div>
      <div ref={DivHome}>
        <h1>Home</h1>
        
        
        <div ref={refDiv1}>
        <ApiUserRandom />
        <button onClick={e => setToogle(state => !state)} >&#8594;</button>
        </div>
        
        <div ref={refDiv2}>
        <ApiUserRandom />
        <button onClick={e => setToogle(state => !state)} >&#8592;</button>
        </div>
      </div>
      
      <div ref={DivCats}>
      
      <form method="post" onSubmit={(e)=> SubmitCat(e)}>
      <h1>Brinque com um gatinho:</h1>
      <input type="number" min="100" max="600" value={cat} onChange={(e) => setCat(e.target.value)}/>
      <input type="submit" onClick={(e) => SubmitCat(e)} value="Brincar" />
          
      </form>
      
      <img src={urlcat} alt="Cat" />
      
      </div>
      
      <div ref={DivDogs}>
      
      <h1>Encontre o seu cahorro favorito:</h1>
      
      <div>
      <button onClick={e => setDogs(state => !state)}>Procurar</button>
      </div>
      
      <br/>
      
      { dogs ?
      <ApiRandomDog />
      :
       null
      }
      
      { !dogs ?
      <ApiRandomDog />
      :
       null
      }
      
      </div>
      
      <div ref={DivContatos}>
      <h1>Clientes</h1>
      
      <div>
      <button ref={BtnAddClienteDiv} onClick={(e) => setDivaddclient(2)}>Adicionar</button> 
      <button ref={CloseDivAddCliente} onClick={(e) => setDivaddclient(1)}>Cancelar Adição de Cliente</button> 
      </div>
      
      <br/>
      
       <div ref={DivAddCliente}>
        <form onSubmit={(e)=>ClientSubmit(e)}>
          <label> Nome:</label><br/>
          <input onChange={(e) => setName(e.target.value)} required />
          <br/>
          <label> E-mail:</label><br/>
          <input type="email" onChange={(e) => setEmail(e.target.value)} required />
          <br/>
          <label> Telefone:</label><br/>
          <input type="phone" max="11" onChange={(e) => setPhone(e.target.value)} pattern="\d" required />
          <br/>
          <label> Endereço:</label><br/>
          <input onChange={(e) => setLocation(e.target.value)} required />
          <br/> 
          <label> CPF:</label><br/>
          <input max="11" pattern="\d" onChange={(e) => setCpf(e.target.value)} required />
          <br/>
          <br/>
          <button type="submit" onClick={(e) => ClientSubmit(e)}>Adicionar Cliente</button> 
           <br/>
        </form>  
        {SucessoCliente ? <p>Cliente Cadastrado com Sucesso</p>  : null }   
        {FracassoCliente ? <p>Erro</p>  : null }
                
       </div>
 
      
      <Clientesdb />
      
      </div>
      
      <div ref={DivSair}>
      <h1>Você quer sair?</h1>
      
      <div>
      	<button onClick={(e) => Deslogar(e)} >Desconectar</button>
      </div>
      
      <br />
      
      <div>
      	<button onClick={(e) => DeslogareEsquecer(e)}>Desconectar e esquecer de mim</button>
      </div>
      
      </div>
         
    </main>
    
    </div>
   
  )}
  else
   { return (<><p>Você não tem permissão para acessar essa página!!</p> <p><a href="/"> Voltar </a></p></>) }
}

export default Home;
