/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1806800299")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3636229171",
    "hidden": false,
    "id": "relation2401513525",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "group_secret",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1806800299")

  // remove field
  collection.fields.removeById("relation2401513525")

  return app.save(collection)
})
