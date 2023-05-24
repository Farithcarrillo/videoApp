const db = require('../../db/mysql');
const authentication = require('../authentication');
const TABLE = 'users';

module.exports = function(dbInjected){

    let dbInstance  = dbInjected;

    if (!dbInstance) {
        dbInstance = require('../../db/mysql');
    }

    function getAll() {
        return dbInstance.getAll(TABLE);
    }
    
    function getById(id) {
        return dbInstance.getById(TABLE, id);
    }
    
    async function add(body){
        const user  ={
            id: body.id,
            name: body.name,
            created_at: new Date()
        }
        const response = await dbInstance.addOrUpdate(TABLE, user);
        let insertId = 0;
        if (body.id == 0) {
            insertId = response.insertId;
        }else{
            insertId = body.id;
        }
        let authResponse = '';
        if (body.username || body.password) {
            authResponse  = await authentication.add({
                id: insertId,
                username: body.username,
                password: body.password
            })
        }

        return authResponse;
    }
    
    function remove(body){
        return db.deleteById(TABLE, body);
    }
    return{
        getAll,
        getById,
        remove,
        add
    }  
}