const { port } = require('./config');
const { app } = require('./app');

app.listen(port, () => console.log(`server is up on port: ${port}`));
