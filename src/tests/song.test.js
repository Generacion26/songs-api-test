const request = require("supertest")
const app = require("../app")
const Album = require("../models/Album")
require("../models")

const URL_SONGS = '/api/v1/songs'

let album
let song
let songId

beforeAll(async () => {

  album = await Album.create({
    name: "lorem12",
    image: "loremImage",
    releaseYear: 2000
  })

  song = {
    name: "maps",
    albumId: album.id
  }

})

test("POST -> 'URL_SONGS', should return status code 201 and res.body.name === song.name", async () => {
  const res = await request(app)
    .post(URL_SONGS)
    .send(song)

  songId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)
})


test("GET -> 'URL_SONGS', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_SONGS)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})


test("GET ONE -> 'URL_SONGS/:id', should return status code 200 and res.body.name === song.name", async () => {
  const res = await request(app)
    .get(`${URL_SONGS}/${songId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)
})

test("PUT -> 'URL_SONGS/:id', should return status code 200 and res.body.name === songUpdate.name", async () => {

  const songUpdate = {
    name: "give me a kiss"
  }

  const res = await request(app)
    .put(`${URL_SONGS}/${songId}`)
    .send(songUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(songUpdate.name)
})



test("DELETE -> 'URL_SONGS/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

  expect(res.status).toBe(204)
  await album.destroy()
})