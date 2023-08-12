const request = require("supertest")
const app = require("../app")
const Album = require("../models/Album")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre")
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

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

  expect(res.body[0].artists).toBeDefined()
  expect(res.body[0].artists).toHaveLength(0)

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

test("POST ->'URL_SONGS/:id/artists', should retrun status code 200 and res.body.length === 1", async () => {

  const artist = {
    name: "LR",
    country: "Dominican Rep",
    formationYear: 2005,
    image: "rap"
  }

  const createArtist = await Artist.create(artist)


  const res = await request(app)
    .post(`${URL_SONGS}/${songId}/artists`)
    .send([createArtist.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createArtist.id)

  await createArtist.destroy()

})

test("POST ->'URL_SONGS/:id/genres', should retrun status code 200 and res.body.length === 1", async () => {

  const genre = {
    name: "rap"
  }

  const createGenre = await Genre.create(genre)

  const res = await request(app)
    .post(`${URL_SONGS}/${songId}/genres`)
    .send([createGenre.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)

  await createGenre.destroy()

})


test("DELETE -> 'URL_SONGS/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

  expect(res.status).toBe(204)
  await album.destroy()
})