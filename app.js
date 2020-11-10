/**
 * Ingest mixtape.json and a changes file.  
 * The changes file should include multiple changes in a single file
 * Output output.json using the same structure as mixtape.json with the changes applied
 */

const fs = require('fs');

let rawdata = fs.readFileSync('mixtape.json');
let input = JSON.parse(rawdata);
let input_plylst = input.playlists; //fetch playlists array from the file
let chgdata = fs.readFileSync('changes.json');
let changes = JSON.parse(chgdata);
//fetch each object from the changes.playlists array and depending on the value of operation, perform add, update or delete
changes.playlists.forEach(element => {
    switch (element.operation) {
        case "0":
            delete element.operation; //removing operation property before adding the object to output
            input_plylst.push(element);
            break;
        case "1":
            delete element.operation;
            let upd_idx = input_plylst.map(f => f.id).indexOf(element.id); //finds the index of the id that needs to be updated
            if (upd_idx != -1) {
                input_plylst[upd_idx] = element;
            }
            break;
        case "2":
            delete element.operation;
            let del_idx = input_plylst.map(f => f.id).indexOf(element.id); //finds the index of the id that needs to be deleted
            if (del_idx != -1) {
                input_plylst.splice(del_idx, 1);
            }
            break;
        default:
            break;
    }
});
fs.writeFileSync('output.json', JSON.stringify(input,null,4)); //creating output.json file using input object