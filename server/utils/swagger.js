const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie website API",
      version,
      description: "Express Movies API"
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}`
      }
    ]
  },
  apis: ["../routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  //Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));

  // //Docs in JSON format
  // app.get("docs.json", (req, res) => {
  //   res.send(swaggerSpec);
  // });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

module.exports = {
  swaggerDocs,
};
