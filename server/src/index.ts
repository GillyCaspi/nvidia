import makeServer from "./server";
import getRouter from "./routers";

const port = 4000;
const server = makeServer();
const router = getRouter();

server.use('/api', router);
server.listen(port, () => console.log('started server at port', port));

