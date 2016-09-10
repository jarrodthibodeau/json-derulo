'use strict';

import assert from 'assert';
import fs from 'fs';
import q from 'q';
import JSONDerulo from '../lib/index';


describe('JSONDerulo', () => {
    describe('sortJsonFile function', () => {
        it('should reject if file being read into cannot be parsed into JSON', (done) => {
            var expectedError = 'Unexpected token :';

            JSONDerulo.sortJsonFile('./spec/test-files/unvalid.json', 'name')
                .then((res) => {
                    expect(true).toBe(false);
                })
                .catch((err) => {
                    expect(err.message).toEqual(expectedError);
                })
                .done(done);
        });

        describe('success', () => {

            //NOTE: This beforeEach is needed to recreate the file
            beforeEach(() => {
                let stringJSON = "[{\"name\": \"huehuehue\"},{\"name\": \"first\"},{\"name\": \"last\"}]",
                    filePath = './spec/test-files/valid_unsorted.json';

                fs.writeFile(filePath, stringJSON,  'utf-8');
            });

            it('should successfully sort jsonFile based on value', function(done) {
                var expectedJson = [
                    { "name": "first" },
                    { "name": "huehuehue" },
                    { "name": "last" }
                ];

                JSONDerulo.sortJsonFile('./spec/test-files/valid_unsorted.json', 'name')
                    .then(function(res) {
                        expect(JSON.parse(res)).toEqual(expectedJson);
                    })
                    .catch(function(err) {
                        expect(true).toBe(false);
                    })
                    .done(done);
            });
        });
    });

    describe('findAllDupes', () => {
        it('should give empty array if no dupes are found', (done) => {
            let expectedOutput = [];

            JSONDerulo.findAllDupes('./spec/test-files/no-dupes.json', 'name')
                .then((res) => {
                    expect(res).toEqual(expectedOutput);
                })
                .catch(() => {
                    expect(true).toBe(false);
                })
                .done(done);
        });



        it('display all the dupes that are found', (done) => {
            let expectedValue = [
                'DANK_MEMES',
                'IHAVEADOG'
            ];

            JSONDerulo.findAllDupes('./spec/test-files/dupes.json', 'name')
                .then((res) => {
                    expect(res).toEqual(expectedValue);
                })
                .catch(() => {
                    expect(true).toBe(false);
                })
                .done(done);
        });
    });

    describe('removeDupe', () => {
        it('should display correct message if item is not found', (done) => {
            let expectedError = 'There are no entries for value ITEM4';

            JSONDerulo.removeDupe('./spec/test-files/no-dupes.json', 'name', 'ITEM4')
                .then(() => {
                    expect(true).toBe(false);
                })
                .catch((err) => {
                    expect(err).toEqual(expectedError);
                })
                .done(done);
        });

        it('should display correct message if no dupes are found', (done) => {
            let expectedError = 'There are no duplicates for value ITEM3';

            JSONDerulo.removeDupe('./spec/test-files/no-dupes.json', 'name', 'ITEM3')
                .then(() => {
                    expect(true).toBe(false);
                })
                .catch((err) => {
                    expect(err).toEqual(expectedError);
                })
                .done(done);
        });

        describe('dupe removal', () => {
            beforeEach(() => {
                let removalJson = "[{\"name\": \"DANK_MEMES\"},{\"name\": \"IHAVEADOG\"},{\"name\": \"THISISNTADUPE\"},{\"name\": \"DANK_MEMES\"},{\"name\": \"IHAVEADOG\"}]",
                    filePath = './spec/test-files/dupe-removal.json';

                fs.writeFile(filePath, removalJson,  'utf-8');

            });

            it('should successfully remove dupe or dupes if one or more are found', (done) => {
                let expectedResult = [
                    {"name": "DANK_MEMES"},
                    {"name": "IHAVEADOG"},
                    {"name": "THISISNTADUPE"},
                    {"name": "IHAVEADOG"}
                ]

                JSONDerulo.removeDupe('./spec/test-files/dupe-removal.json', 'name', 'DANK_MEMES')
                    .then((res) => {
                        expect(JSON.parse(res)).toEqual(expectedResult);

                    })
                    .catch((err) => {
                        expect(true).toBe(false);
                    })
                    .done(done);
            });
        });


    });
});
