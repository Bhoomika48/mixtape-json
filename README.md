# mixtape
## Introduction and Overview of the Project:
The goal of this project is to apply changes to an existing json file and generate an output file. The app.js file
  * Ingests mixtape.json and a changes.json file
  * Reads through all the changes and applies them depending on the value in "operation" property
    - operation property defines the changes i.e., insert, update and delete operation in changes.json file. Ex: "operation":"1"
        **Values in operation:**
            0 = insert
            1 = update
            2 = delete
  * Creates output.json using the same structure as mixtape.json with all the changes from changes.json

## Technologies used:
node
 ### Installing node
    - For Windows
        https://nodejs.org/en/download/ 
    - For macOS
        brew install node

## Changes.json File Structure:
Changes are provided through changes.json file and it has similar structure as of mixtape.json except for an additional property "operation" as mentioned above in overview section

### Content of changes.json file:
* Add a new playlist; the playlist should contain at least one song - PLAYLIST 4 WAS ADDED
* Remove a playlist - PLAYLIST 2 WAS REMOVED
* Add an existing song to an existing playlist - ADDED SONG 11 TO PLAYLIST 1

## How to run:
- Open terminal
- go to the project location. For me, the project location is /Downloads/mixtape-json/
- run the command: node app.js

## Result:
output.json will be created in the same folder

## Understanding the results
* output.json has the same data for users and songs section as that of mixtape since there were no changes made to these in the changes.json file
* Only the playlists array has changed in the output.json file when compared with mixtape.json
    - playlist 1 now has an additional song with song_id = 11
    - playlist 2 doesn't exist anymore since it was deleted
    - playlist 3 remains unchanged
    - a new playlist with id = 4 was added

## Scaling for Large dataset
As the given input json file is small, I have used the application to laod file into memory and process it. Having said that, I forsee following scaling issues, and I also documented the possible solutions for the scaling problems.
1. what happens when the file size is huge?
- we can read the files as streams. This means you can traverse through the file and once you find the array that you want loaded, you just load the objects from it into memory and process it. One of the ways to do this is by using stream-json

2. Using stream processing as an alternative when we have a high user base who frequently update their playlists
- In real time scenario, if we are receiving huge raw data files as a stream from multiple input sources (producers), we can set up a kafka consumer as an intermediate store and read the files into a database server as and when they arrive. Similarly, changes would be directly applied to the raw data stored in database and application will consume from the database. In my experience, we have loaded 1 million large files every 15 minutes with changes into a Microsoft SQL Server database. 

3. what happens if there are large number of json files as input and we process high number of changes every minute?
- For large scale processing, another way to handle this would be to store the json files in the open source document databases such as mongodb and couchdb. mixtape and changes file can be stored in collections and CRUD ooperations can be applied by finding the respective object in the document
