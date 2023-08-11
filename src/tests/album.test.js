const request = require("supertest")
const app = require("../app")
const Artist = require("../models/Artist")
require("../models")

let album
let artist

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

  await artist.destroy()
})
