const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  //  name field / Campo de nome
  name: {
    type: String,
    required: [true, "Por favor, informe seu nome!"],
    unique: false,
  },
  
  // username field / Campo de Nome do Usuário
  username: {
    type: String,
    required: [true, "Por favor, forneça um Nome de Usuário!"],
    unique: [true, "Usuário já Existe"],
  },

  //  password field / Campo de senha
  psd: {
    type: String,
    required: [true, "Por favor, forneça uma senha!"],
    unique: false,
  },
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("shareapienergy.users", UserSchema);
