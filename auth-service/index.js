const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { NODE_DOCKER_PORT } = process.env;
const port = process.env.PORT || NODE_DOCKER_PORT;

// Server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});