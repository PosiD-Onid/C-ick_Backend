const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "C!ick",
      description:
        "학생들을 위한 학생들에 의한 수행평가 일정관리 플랫폼",
    },
    servers: [
      {
        url: "http://localhost:7221/api",
      },
    ],
  },
  apis: ["./routes/api.js"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }