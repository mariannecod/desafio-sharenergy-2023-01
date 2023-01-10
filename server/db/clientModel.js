const mongoose = require("mongoose");

// user schema
const ClientSchema = new mongoose.Schema({
  //  name field / Campo de nome
  name: {
    type: String,
    required: [true, "Por favor, informe seu nome!"],
    unique: false,
  },
  
  // email field / Campo de Nome do Usuário
  email: {
    type: String,
    required: [true, "Por favor, forneça o e-mail!"],
    lowercase:true,
    unique: [true, "Email já Existe"],
  },

  //  number phone field / Campo de número de telefone
  phone: {
    type: Number,
    required: [true, "Por favor, um número de telefone!"],
    unique: false,
  },

  // location field / Campo de Endereço
  location: {
    type: String,
    unique: false,
  },
  
  //  cpf field / Campo de CPF
  cpf: {
    type: Number,
    required: [true, "Por favor, forneça o CPF!"],
    unique: true,
  },  
});

// export UserSchema
module.exports = mongoose.model.clients || mongoose.model("shareapienergy.clients", ClientSchema);
