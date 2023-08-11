const request = require("supertest")
const app = require("../app")
const Artist = require("../models/Artist")
require("../models")

let album
let artist
let albumId

beforeAll(async () => {

  artist = await Artist.create({
    name: "LR",
    country: "Dominican Rep",
    formationYear: 2005,
    image: "rap"
  })

  album = {
    name: "loremAlbum",
    image: "loremImage",
    releaseYear: 2020,
    artistId: artist.id
  }

})

const URL_ALBUMS = '/api/v1/albums'

test("POST -> 'URL_ALBUMS', should return status code 201, and res.body.name ==== album.name", async () => {
  const res = await request(app)
    .post(URL_ALBUMS)
    .send(album)
  albumId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(album.name)

})

test("GET -> 'URL_ALBUMS', should return status code 200, and res.body.length ====1", async () => {
  const res = await request(app)
    .get(URL_ALBUMS)


  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("PUT -> '/api/v1/albums'/:id', should return status code 200, and res.body.firstName === albumUpdate.name", async () => {
  const albumUpdate = {
    name: "albumUpdate"
  }

  const res = await request(app)
    .put(`/api/v1/albums/${albumId}`)
    .send(albumUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(albumUpdate.name)
})


test("Delete -> '/api/v1/albums'/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`/api/v1/albums/${albumId}`)

  expect(res.status).toBe(204)
  await artist.destroy()
})

