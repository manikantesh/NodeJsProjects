# Create document Movies

## Insert Five Movies

db.movies.insertOne(
   { name: "canvas", genre: "Action", rating: 5, language: "Hindi" }
)

db.movies.insertOne(
   { name: "canvas1", genre: "Comedy", rating: 3, language: "Tamil" }
)

db.movies.insertOne(
   { name: "canvas2", genre: "Thriller", rating: 5, language: "Telugu" }
)

db.movies.insertOne(
   { name: "canvas3", genre: "Fiction", rating: 8, language: "Kannada" }
)

db.movies.insertOne(
   { name: "canvas4", genre: "Action", rating: 9, language: "Hindi" }
)

## using insertMany

db.movies.insertMany([
     { name: "canvas", genre: "Action", rating: 5, language: "Hindi" },
     { name: "canvas1", genre: "Comedy", rating: 3, language: "Tamil" },
     { name: "canvas2", genre: "Thriller", rating: 5, language: "Telugu" },
     { name: "canvas3", genre: "Fiction", rating: 8, language: "Kannada" },
     { name: "canvas4", genre: "Action", rating: 9, language: "Hindi" }
])

## Retrive all documents in a collection

db.movies.find()

## Using findOne() //Need to work again

db.movies.findOne()

## Retrive top three fighest rated movies.

db.movies.find().limit(3).sort({"rating":-1})

## Update two records with Save and Update options

db.movies.update(
    {"name":'canvas4'},
    {
        '$set':{'achievements':'Super Hit'}
    }
)

## Save Operation // However it is deprecated!

db.movies.save({ _id: ObjectId("60a28d9cedf70b2af583df13"),
  name: 'canvas',
  genre: 'Action',
  rating: 5,
  language: 'Hindi', achievements:'Super Duper Hit'})

var one = db.movies.find().limit(1)

## Retrive all documents that matches achievements

db.movies.find({
    "achievements":{"$in":["Super Duper Hit","Super Hit"]}
})


db.movies.find()

## Retrive all documents that has specific field

db.movies.find({"achievements":{$exists:true}})