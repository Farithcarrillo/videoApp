const app = require('./app');
const { swaggerDocs: UserSwaggerDocs} = require('../src/modules/users/swagger')

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"));
    UserSwaggerDocs(app, app.get("port"))
});