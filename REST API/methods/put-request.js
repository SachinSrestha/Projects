const bodyparser = require("../util/bady-parser")
const writetofile = require("../util/writetofile")

module.exports = async(req,res)=>{
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id =req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if(!regexV4.test(id)){
        res.writeHead(400, {"Content-Type": "appolcation/json"})
        res.end(JSON.stringify({title:"Validation Failed", message : "Movie Not Found"}));
    }else if(baseUrl ==="/api/movies/" && regexV4.test(id)){
        try{
            let body = await bodyparser(req);
            let index = req.movies.findIndex((movie) =>{
                return movie.id ===id;
            });
            if(index === -1){
                res.statusCode =404;
                res.write(JSON.stringify({title:"Not Found", message : "Movie Not Found"}));
                res.end();
            }else{
                req.movies[index] ={id, ...body};
                writetofile(req.movies);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }
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