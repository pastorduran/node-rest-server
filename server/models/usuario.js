const mongoose = require ('mongoose');
//Se agrega plugin validator para gestionar errores en duplicado de registros
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

// finicioón de valores validos para el attr role de un usuario
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

//Definición de schema usuario con sus atributos
let usuarioSchema = new Schema({
    // Definición de atributos, con tipo y restricciones
    nombre: {
        type: String,
        required : [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required : [true, 'El email es necesario'],
    },
    password: {
        type: String,
        required : [true, 'La contraseña es necesario']
    },
    imag: {
        type: String,
        required: false
    }, // no es obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum : rolesValidos
    }, // Se define el attr role, con su valor por defecto y los valores validos que recibe
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    google: {
        type: Boolean,
        default: false
    }
});

// Eliminamos de la respuesta el attr password sobreescribiendo el metodo toJSON del schema
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

// se agrega el plugin al schema usuario definido anteriormente, con el el mensaje a mostrar si ocurre el error
usuarioSchema.plugin(uniqueValidator , {
    message : '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
