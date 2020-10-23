const bcrypt = require('bcryptjs');
const passport = require('passport');
const helpers = {};


//encriptación de la contraseña del usuario
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash;
};

helpers.passwordCompare = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (err) {
        console.log(err);
    }
};

module.exports = helpers;