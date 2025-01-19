/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3636229171")

  // remove field
  collection.fields.removeById("relation3409083156")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3636229171")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1806800299",
    "hidden": false,
    "id": "relation3409083156",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "secrets",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
