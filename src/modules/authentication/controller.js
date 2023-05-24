const db = require('../../db/mysql');
const auth = require('../../auth');
const TABLE = 'authentication';
const bcrypt = require('bcrypt')

module.exports = function(dbInject){

    let db = dbInject;

    if (!db) {
        db = require('../../db/mysql');
    }

    async function login(username, password) {
        const data = await db.query(TABLE, {username: username});
        return bcrypt.compare(password, data.password)
            .then (result => {
                if (result === true) {
                    //Generar Token
                    return auth.assignToken({...data});
                }else{
                    throw new Error('Información invalida');
                }
            })
    }
    
    async function add(data){
        const authData = {
            id: data.id,
        }
        if(data.username){
            authData.username = data.username;
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5) ;
        }
        return db.addOrUpdate(TABLE, authData);
    }
    
    return{
        add,
        login
    }  
}