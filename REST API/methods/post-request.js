const crypto = require("crypto");
const bodyparser = require("../util/bady-parser")
const writetofile = require("../util/writetofile")

module.exports = async (req,res)=>{
    if(req.url === "/api/movies"){
        try{
            let body = await bodyparser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writetofile(req.movies);
            res.writeHead(201, {"Content-Type" : "application/json"});
            res.end();
        }catch(err){
            console.log(err);
            res.writeHead(400, {"Content-Type": "appolcation/json"});
            res.end(JSON.stringify({title:"Validation Failed", message : "Movie Not Found"}));
        }
        
    }else{
        res.writeHead(404, {"Content-Type": "appolcation/json"})
        res.end(JSON.stringify({title:"Page Not Found", message : "Error 404 occured"}));
    }
};