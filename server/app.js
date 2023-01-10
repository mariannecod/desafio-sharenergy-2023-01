const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Client = require("./db/clientModel");
const auth = require("./auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ mensagem: "Servidor Funcionando" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
      	name: request.body.name,
        username: request.body.username,
        psd: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Usuário Criado com Sucesso",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Erro ao criar usuário",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "A senha não teve êxito na criptografia",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ username: request.body.username })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.psd, user.psd)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "As senhas não correspondem",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login com Sucesso!!",
            username: user.username,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "As senhas não correspondem",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email não existe",
        e,
      });
    });
});


// register client endpoint
app.post("/registerclient", (request, response) => {

      const client = new Client({
      	name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        location: request.body.location,
        cpf: request.body.cpf,
      });

      client.save()
        .then((result) => {
          response.status(201).send({
            message: "Cliente Adicionado com Sucesso!!",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Erro ao Adicionar Cliente ",
            error,
          });
        });
});

// clients endpoint
app.get("/clientes",(req, res) => {
  Client.find((err, client) => {
    if (err) {
      res.status(400).send("Não foi possível ver todos os Clientes!");
    }
    else {
      res.status(200).json(client);
    }
  });
}

)

app.get("/clientes/:id",(req, res) => {
  Client.findById(req.params.id, (err, client) => {
        if (err) {
            res.status(400).send("Não foi possível acessar o cliente" + err);
        }
        else {
            res.status(200).json(client);}
    })
}

)

app.put("/clientes/:id",(req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, client) => {
    if (err) {
      res.status(400).send("Não foi possível atualizar o cliente", err);
    }
    else {
      res.status(200).json(client);
    }
  });
})

app.delete("/clientes/:id", (req, res) => {
        var id = req.params.id;
        Client.findById(id, (error, cliente)=> {
        if(error){
                res.send('Erro ao tentar recuperar o cliente....: ' + error);
        }
        else{
        if(cliente){

                Client.deleteOne({ _id: id }, (error) => {
                if(error){
                res.send('Erro ao tentar deletar o cliente....: ' + error);
                }
                else{
                res.json({ message:'cliente deletado com sucesso!' });
                }
                });
        }
        else{
                res.json({ message:'cliente não encontrado!' });
       }
      }
      });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
