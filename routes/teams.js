var express =  require("express");
var router =  express();
var mysql = require("mysql");
var config = require("config");

console.log(config.get("host"));

var connection =  mysql.createConnection({
    database:config.get("database"),
    user : config.get("user"),
    password:config.get("password"),
    port : "9090",
    host : "172.18.4.238"
});

connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from CricStatTB";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.post("/",(request, response)=>{

    var Country = request.body.Country;
    var Year = request.body.Year;
    var NoofTeam = request.body.NoofTeam;
    var Venue = request.body.Venue;

    var queryText = `insert into CricStatTB(Country,Year,NoofTeam,Venue) values('${Country}',${Year},${NoofTeam}, '${Venue}')`;
    connection.query(queryText,(err, result)=>{
    if(err==null)
    {
        response.send(JSON.stringify(result));
    }
    else{
        response.send(JSON.stringify(err));
    }
});
});

router.delete("/:Venue",(request, response)=>{
    var v = request.params.Venue;
    var queryText = `delete from CricStatTB where Venue = '${v}'`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

module.exports = router;
