const request = require("supertest")
const app = require("../app")

require("../models")

const URL_ARTISTS = '/api/v1/artists'

let artistId

const artist = {
  name: "LR",
  country: "Dominican Rep",
  formationYear: 2005,
  image: "rap"
}

test("POST -> 'URL_ARTISTS', should return code 201 and res.body.name === artist.name", async () => {
  const res = await request(app)
    .post(URL_ARTISTS)
    .send(artist)

  artistId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("GET -> 'URL_ARTISTS', should return code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_ARTISTS)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("GET ONE-> 'URL_ARTISTS/:id', should return code 200 and res.body.name === artist.name", async () => {
  const res = await request(app)
    .get(`${URL_ARTISTS}/${artistId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("PUT -> 'URL_ARTISTS/:id', should return status code 200 and res.body.name === artistUpdate.name", async () => {

  const artistUpdate = {
    name: "Enrrique Iglesias"
  }
  const res = await request(app)
    .put(`${URL_ARTISTS}/${artistId}`)
    .send(artistUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artistUpdate.name)
})


test("DELETE> 'URL_ARTISTS/:id', should return code 204", async () => {
  const res = await request(app)
    .delete(`${URL_ARTISTS}/${artistId}`)

  expect(res.status).toBe(204)
})