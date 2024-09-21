const fs = require("fs");
const path = require("path");

filePath = path.join(__dirname, ".." ,"data", "movies.json");

module.exports = (data) => {
    try{
        fs.writeFileSync(filePath, JSON.stringify(data, null,4), "utf-8");
    }catch(err){
        console.log(err);
    }
}