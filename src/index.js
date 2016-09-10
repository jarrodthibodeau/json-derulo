import assert  from 'assert';
import fs from 'fs';
import q from 'q';

class JSONDerulo {
    constructor() {}

    /**
     * Sorts a JSON file based on the key being passed in
     *
     * @param jsonFile  - String of filepath for JSON file
     * @param sortField - Field of the JSON key, you want to sort
     * @returns json - A sorted stringifed json object based on what you wanted sorted
     */
     sortJsonFile(jsonFile, sortField) {
        return q.promise((resolve, reject) => {
            fs.readFile(jsonFile, 'utf-8', (err, file) => {
                let json;

                if (err) {
                    return reject(err);
                }

                try {
                    json = JSON.parse(file);
                } catch(e) {
                    return reject(e);
                }

                json.map((item) => {
                    assert(item[sortField] !== undefined, 'Sort value needs to exist for all items');
                    assert(typeof(item[sortField]) === 'string' || typeof(item[sortField] === 'Number'), 'Sort field must be sortable');
                });

                if (typeof(json[0][sortField]) === "string") {
                    json = json.sort((a, b) => {
                        return a[sortField].localeCompare(b[sortField]);
                    });
                } else {
                    json = json.sort((a, b) => {
                         return a[sortField] - b[sortField];
                    });
                }

                json = JSON.stringify(json, null, 2);

                fs.writeFile(jsonFile, json, 'utf-8', (err, file) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(json);
                });
            });

        });
    }

    /**
     * Will go through your JSON file and find all dupes based on the key that is passed in
     *
     * @param jsonFile  - String of filepath for JSON file
     * @param sortField - Field of the JSON key, you want to sort
     * @returns dupedItems - An array containing all the duplicates in your json file
     */
    findAllDupes(jsonFile, dupeField) {
        return new q.promise(function(resolve, reject) {
            fs.readFile(jsonFile, 'utf-8', function(err, file) {
                let json,
                    dupedItems = [];

                if (err) {
                    throw err;
                }

                json = JSON.parse(file);

                for (let i = 0; i < json.length; i++) {
                    let itemCount = 0;

                    for (let j = 0; j < json.length; j++) {
                        if (json[j][dupeField] === json[i][dupeField]) {
                            itemCount++;
                        }
                    }

                    if (itemCount > 1 && dupedItems.indexOf(json[i][dupeField]) === -1)  {
                        dupedItems.push(json[i][dupeField]);
                    }
                }

                resolve(dupedItems);
            });
        });
    }

    /**
     *  Removes a duplicate value from your JSON file based on key and dupe to remove
     *
     * @param jsonFile  - String of filepath for JSON file
     * @param dupeField
     * @param dupeValueToRemove
     * @returns json - A stringifed json object with the dupe removed
     */
     removeDupe(jsonFile, dupeField, dupeValueToRemove) {
         return q.promise(function(resolve, reject) {
             fs.readFile(jsonFile, 'utf-8', (err, file) => {
                 let json,
                     dupeItems =[];

                 if (err) {
                      return reject(err);
                 }

                 try {
                     json = JSON.parse(file);
                 } catch(e) {
                     return reject(e);
                 }

                 json.map(function(item) {
                     if (item[dupeField] === dupeValueToRemove) {
                         dupeItems.push(item);
                     }
                 });

                 if (dupeItems.length === 0) {
                     return reject("There are no entries for value " + dupeValueToRemove);
                 } else if (dupeItems.length === 1) {
                     return reject("There are no duplicates for value " + dupeValueToRemove);
                 } else {
                     if (dupeItems.length === 2) {
                         json.splice(json.indexOf(dupeItems[1]), 1);
                     } else {
                         for (let i = 1; i < dupeItems.length; i++) {
                             json.splice(json.indexOf(dupeItems[i]), 1);
                         }
                     }
                 }

                 json = JSON.stringify(json, null , 2);

                 return fs.writeFile(jsonFile, json, 'utf-8', (err, file) => {
                     if (err) {
                         return reject(err);
                     }

                     return resolve(json);
                 });

             });
         });
     }
}

export default new JSONDerulo();
