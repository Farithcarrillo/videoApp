const app = require('./app');
const { swaggerDocs: UserSwaggerDocs} = require('../src/modules/users/swagger')

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"), `http://localhost:${app.get("port")}/api/users/`);
    UserSwaggerDocs(app, app.get("port"))
});