const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM Backend API",
      version: "1.0.0",
      description: "Role-based CRM system API documentation",
    },
    // servers: [
    //   {
    //     url: "http://localhost:5000",
    //   },
    // ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Where swagger reads docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
