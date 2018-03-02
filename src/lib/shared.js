/**
 * Converts firebase database snapshot to an array
 * @export
 * @param {object} snapshot 
 * @returns {Array} array form of the data
 */
export function convertSnapshotToArray(snapshot) {
    const array = [];
    
    snapshot.forEach((item, i) => {
        array.push({
            key: i,
            ...item.val()
        })
    });
    
    return array;
}