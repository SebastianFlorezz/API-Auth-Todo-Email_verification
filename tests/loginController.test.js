const request = require("supertest")
const app = require("../app.js")

describe("POST  /login", () =>{
    it("Should return 200 and a token if credentials are correct", async() =>{
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "fdvbvocdfgfdm@gmail.com",
                password: "sdfosJsdof8??"
            })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty("token")
            expect(res.body.token).toMatch(/^eyJ/)
    })


    it("Should return 401 if incorrect password", async() =>{
        const res = await request(app)
        .post("/login")
        .send({
            email: "fdvbvocdfgfdm@gmail.com",
            password: "asdasc"
        })

        expect(res.statusCode).toBe(401)
    })
})

