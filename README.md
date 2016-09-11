# json-derulo

<img src="https://travis-ci.org/jarrodthibodeau/json-derulo.svg?branch=master" />

### A library to maintain JSON files that follow a strict structure


## function sortJsonFile(jsonFile, sortField)
This will sort a JSON file based on what key you want sorted.
The key to be sorted one MUST be of String or Number value, otherwise.
An error will be thrown. This will return a stringified JSON object with
your sorted JSON as well as your JSON file being sorted.

## function findAllDupes(jsonFile, dupeField)
This will find every duplicate in your JSON file based on the key value.
That is passed in. This will return an array of the dupes.

## function removeDupe(jsonFile, dupeField, dupeValueToRemove)
This will remove a dupe from a JSON value based on the key field,
as well as the value relating to that key that is a dupe. An error
will be returned if the value cannot be found or if there is no duplicates.
This will rewrite the file with the dupe removed and return a stringifed JSON object
with the dupe removed.


# Plans for the future

* Add function to Remove All Dupes
* Allow for more sorting options rather than string & int
* Add ability to select what dupe to remove for user
* Potentially create a CLI tool for this

#License
---
The MIT License (MIT)

Copyright (c) 2013 Tomás Senart

```
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
