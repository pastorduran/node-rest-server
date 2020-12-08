
// ============================
//  SEED de autenticación
// ============================
const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
    
};

// ============================
//  Verifica AdminRole
// ============================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if ( usuario.role == "ADMIN_ROLE"){
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Role de usuario no válido para realizar la operación'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdminRole
}