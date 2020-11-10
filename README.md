# mixtape
## Introduction:
The goal of this project is to apply changes to an existing json file and generate an output file. The app.js file
  * Ingests mixtape.json and a changes.json file
  * Reads through all the changes and applies them depending on the value in "operation" property
  * Creates output.json using the same structure as mixtape.json with all the changes from changes.json

## Technologies:
node

## Prerequisites:
1. Install node
    - For Windows
        https://nodejs.org/en/download/ 
    - For macOS
        brew install node

## Changes.json File Structure:
Changes are provided through changes.json file and it has similar structure as of mixtape.json except for an additional property "operation"

**Values in operation:**
0 = insert
1 = update
2 = delete

### Content of changes.json file:
* Add a new playlist; the playlist should contain at least one song - PLAYLIST 4 WAS ADDED
* Remove a playlist - PLAYLIST 2 WAS REMOVED
* Add an existing song to an existing playlist - ADDED SONG 11 TO PLAYLIST 1

## Launch:
node app.js

## Result:
output.json will be created

## Scaling for Large dataset
Javascript is a fast processing tool and is good when you have small size files to be stored in memory even if the number of change files are large 