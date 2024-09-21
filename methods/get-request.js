module.exports =(req,res)=>{
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id =req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

    if(req.url === "/api/movies" || req.url === "/api/movies/"){
        res.statusCode =200;
        res.setHeader = ("Content-Type", "appolcation/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(!regexV4.test(id)){
        res.writeHead(400, {"Content-Type": "appolcation/json"})
        res.end(JSON.stringify({title:"Validation Failed", message : "Movie Not Found"}));
    }else if(baseUrl ==="/api/movies/" && regexV4.test(id)){
        res.setHeader = ("Content-Type", "appolcation/json");
        let filteredMovies = req.movies.filter((movie) => {
            return movie.id === id;
        });
        if(filteredMovies.length >0){
            res.statusCode =200;
            res.write(JSON.stringify(filteredMovies));
            res.end();
        }else{
            res.statusCode =404;
            res.write(JSON.stringify({title:"Not Found", message : "Movie Not Found"}));
            res.end();
        }
        
    }else{
        res.writeHead(404, {"Content-Type": "appolcation/json"})
        res.end(JSON.stringify({title:"Page Not Found", message : "Error 404 occured"}));
    }
};