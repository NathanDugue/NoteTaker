// Dependencies to read json
const fs = require("fs");

var uniqid = require("uniqid");

//ROUTING
module.exports = funtion (app) {
    // Get Request
    app.get("/api/notes", (req,res) => {
        console.log("Execute GET notes request");
    // Read the db.json file
    let data = fs.readFileSync("./app/data/db.json", "utf8");
    // Response of json data
    res.json(JSON.parse(data));
    });

    //POST Request
    app.post("/api/notes", (req, res) => {
        
        const newNote = {
            ...req.body,
            id: uniqid(),
        };
        console.log("POST Request for new notes");

        //Read data from json file
        let data = fs.readFileSync("./app/data/db.json", "utf8");

        const dataJSON = JSON.parse(data);

        dataJSON.push(newNote);

        fs.writeFile(
            "./app/data/db.json",
            JSON.stringify(dataJSON),
            (err, text) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("HELLO", text);
                }
        );
        console.log("Success, added a new note");
        //Send response to json data
        res.json(data);

    });
        // DELETE Request
        app.delete("/api/notes/:id", (req,res) => {
            
            let data = fs.readFileSync("./app/data/db.json", "utf8");

            //variable for setting up filter method
            const dataJSON = JSON.parse(data);

            const newNotes = dataJSON.filer((note) => {
                return note.id !== req.params.id;

            });
            //console.log(req.params)
            fs.writeFile("./app/data/db.json", JSON.stringify(newNotes), (err, text) => {
                if(err){
                    console.error(err);
                    return;
                }
            });
            res.json(newNotes);
            });

};