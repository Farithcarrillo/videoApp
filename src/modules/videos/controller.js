const db = require('../../db/mysql');
const TABLE = 'videos';

module.exports = function(dbInjected){

    let dbInstance = dbInjected;

    if (!dbInstance) {
        dbInstance = require('../../db/mysql');
    }

    function getAll() {
        return dbInstance.getAll(TABLE);
    }
    
    function getById(id) {
        return dbInstance.getById(TABLE, id);
    }
    
    function add(body) {
        const video  ={
            id: body.id,
            title: body.title,
            description: body.description,
            credits: body.credits,
            published_at: new Date(),
            is_public: body.is_public,
            user_id: process.env.USERID
        }
        return dbInstance.addOrUpdate(TABLE, video);
    }

    function remove(body) {
    return dbInstance.remove(TABLE, body);
    }
    return{
        getAll,
        getById,
        remove,
        add
    }  
}