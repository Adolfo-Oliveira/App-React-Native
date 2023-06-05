const app = require('./server'); // Importa o arquivo server.js

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
