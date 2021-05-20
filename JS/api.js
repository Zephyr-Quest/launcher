const API_ROOT = 'http://localhost/ZephyrQuest/server/api.php'

/**
 * Get all saved maps in the database
 * @return {Promise} A Promise for results 
 */
 function getAllMaps(){
    return new Promise((resolve, reject) => {
        fetch(API_ROOT + '/maps')
            .then((data) => data.json())
            .then((body) => resolve(body))
            .catch((err) => reject(err))
    })
}

/**
 * Get a saved map by its name
 * @param String The map name
 * @return {Promise} A Promise for result 
 */
 function getMapByName(name){
    return new Promise((resolve, reject) => {
        fetch(API_ROOT + '/mapByName?name=' + name)
            .then((data) => data.json())
            .then((body) => resolve(body))
            .catch((err) => reject(err))
    })
}

/**
 * Upload a new map to the database
 * @param Object Map info
 * @return {Promise} A Promise for result 
 */
function uploadNewMap(map){
    return new Promise((resolve, reject) => {
        const url = API_ROOT + '/newMap?name=' + map.name + '&author=' + map.author
        const options = {
            method: 'POST',
            body: JSON.stringify(map.items),
            credentials:"include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then((data) => {
                if (data.status >= 200 && data.status <= 299) return data
                else throw Error(data.statusText)
            })
            .then((body) => resolve(body))
            .catch((err) => reject(err))
    })
}