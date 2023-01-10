import React from 'react';
import axios from "axios";

class Clientesdb extends React.Component {    
  state = {
    data: null,
    filter: ""
  }; 
  componentDidMount() {
    const configuration = {
      method: "get",
      url: "http://localhost:3000/clientes",
    };

    axios(configuration)
      .then((result) => {    
        this.setState({ data: result.data });
        })
      .catch((error) => {
        error = new Error();
      });
 }

  render() {
  
  function con(a:any) {
     console.log(a);
  }
  
  function Mostrar(id:string) {
  let idcliente = document.getElementById(id);
  
  idcliente.style.display = "block";
  }
  
  function Esconder(id) {
  let idcliente = document.getElementById(id);
  
  idcliente.style.display = "none";
  }
  
  function LiberarEdição(a:any,b:any,c:any,d:any,e:any) {
     let pname = document.getElementById(a); 
     let pemail = document.getElementById(b);
     let pphone = document.getElementById(c);
     let plocation = document.getElementById(d);
     let pcpf = document.getElementById(e);
     
     pname.contentEditable = true;
     pemail.contentEditable = true;
     pphone.contentEditable = true;
     plocation.contentEditable = true;
     pcpf.contentEditable = true;
     
  }
  
    function CancelarEdição(a:any,b:any,c:any,d:any,e:any) {
     let pname = document.getElementById(a); 
     let pemail = document.getElementById(b);
     let pphone = document.getElementById(c);
     let plocation = document.getElementById(d);
     let pcpf = document.getElementById(e);
     
     pname.contentEditable = false;
     pemail.contentEditable = false;
     pphone.contentEditable = false;
     plocation.contentEditable = false;
     pcpf.contentEditable = false;

     
  }
  
    function AtualizarCliente(id:any,a:any,b:any,c:any,d:any,e:any) {
     let name = document.getElementById(a).innerText; 
     let email = document.getElementById(b).innerText;
     let phone = document.getElementById(c).innerText;
     let location = document.getElementById(d).innerText;
     let cpf = document.getElementById(e).innerText;
     
     
     
     const cliput = {
      method: "put",
      url: "http://localhost:3000/clientes/" + id,
      data: {
        name,
        email,
        phone,
        location,
        cpf
      },
    };

    axios(cliput)
      .then((result) => {    
        console.log("Atualizador")
        })
      .catch((error) => {
        error = new Error();
      });

     
  }
  
  function DeleteCliente(id) {

    const clidel = {
      method: "delete",
      url: "http://localhost:3000/clientes/" + id,
    };

    axios(clidel)
      .then((result) => {    
        console.log("Apagador")
        })
      .catch((error) => {
        error = new Error();
      });
    
  }
  
  function AlternarBtnsCliente(id) {
    let btnscliente = document.getElementById(id);
    
    let btn = 1
    
    if (btn === 1)
    {
    btnscliente.style.display = "none";
    btn = 2;
    }
    else
    {
    btnscliente.style.display = "block";
    btn = 1;
    }
  }
  
    return (
      <div className="App">
        <input
          type="search"
          placeholder="Busque 🔍"
          value={this.state.filter}
          onChange={e => {
            this.setState({
              filter: e.target.value
            });
          }}
        />
    <br/> <br/>

        {this.state.data &&
          this.state.data
            .filter(clientes => clientes.email.includes(this.state.filter) || clientes.name.includes(this.state.filter) || clientes.location.includes(this.state.filter) || clientes._id.includes(this.state.filter) )
            .map(clientes => (
	 <div key={clientes._id} id={clientes._id} style={{border: "1px solid #bbb", margin:"15px 5px", padding: "7px", display: "inline-block", borderRadius:"5px", wordWrap: "break-word", width:"275px"}}>
	 
	  
		 <img src={"https://picsum.photos/200"} alt="Picture Cliente" style={{border: "1px solid #ced", borderRadius:"50%"}}/>
		 <p style={{fontWeight:"bold"}} id={"pname" + clientes._id} contentEditable={false}  suppressContentEditableWarning={true}>{clientes.name}</p>
		 <p   id={"pemail" + clientes._id} contentEditable={false}suppressContentEditableWarning={true}>{clientes.email}</p>
		 <p   id={"pphone" + clientes._id} contentEditable={false} suppressContentEditableWarning={true}>{clientes.phone}</p>
		 <p   id={"plocation" + clientes._id} contentEditable={false}suppressContentEditableWarning={true}>{clientes.location}</p>
		 <p   id={"pcpf" + clientes._id} contentEditable={false}suppressContentEditableWarning={true}>{clientes.cpf}</p>
		 
		 <div id={"btns-editar" + clientes._id} style={{display:"none"}}>
		 <button onClick={()=>{AtualizarCliente(clientes._id, "pname" + clientes._id, "pemail" + clientes._id, "pphone" + clientes._id, "plocation" + clientes._id, "pcpf" + clientes._id)}}>Atualizar</button> <br/> <br/>
		 <button style={{backgroundColor: "LightCoral"}} onClick={() => { {Esconder("btns-editar" + clientes._id)} CancelarEdição(clientes._id, "pname" + clientes._id, "pemail" + clientes._id, "pphone" + clientes._id, "plocation" + clientes._id, "pcpf" + clientes._id)}}>Cancelar Edição</button>
		 </div>
		 
		 <div id={"btn" + clientes._id}>
			 <details> <summary> Mais </summary>
			 <button onClick={() => {Mostrar("btns-editar" + clientes._id), LiberarEdição("pname" + clientes._id, "pemail" + clientes._id, "pphone" + clientes._id, "plocation" + clientes._id, "pcpf" + clientes._id)}}>Editar</button>
			 <button onClick={() => DeleteCliente(clientes._id)} >Deletar</button>
			 <p><small>id: {clientes._id}</small></p>
			 </details>
	         </div>
	 
	 </div>
          
            ))}
      </div>
    );
  }
} 


export default Clientesdb;

