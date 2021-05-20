# ZephyrQuest - Launcher

The game launcher for ZephyrQuest.

## APIs function to manage maps

```js
// Get all saved maps
getAllMaps()
    .then((maps) => console.log(maps))
    .catch((err) => {
        alert("Error...")
        console.error(err)
    })

// Get a map by its name 'test'
getMapByName('test')
    .then((map) => console.log(map))
    .catch((err) => {
        alert("Error...")
        console.error(err)
    })

// A map example
const map = {
    name: 'gerher',
    author: 'MartDel',
    items: [
        {
            id: 1,
            x: 4,
            y: 5,
            usages: [
                {
                    id: 1,
                    x: 4,
                    y: 5,
                    usages: []
                }
            ]
        }
    ]
}
// Upload this map to the server
// An error can be returned if the map name is already contained in the database
uploadNewMap(map)
    .then(() => console.log('Map uploaded !'))
    .catch((err) => {
        alert("Error...")
        console.error(err)
    })
```
