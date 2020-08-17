// Reading data from the JSON file using FETCH Function and promises 

const express = require('express');
var app = express();
const fetch = require("node-fetch");
const fs = require("fs");
const chalk = require("chalk");
const url = require("url");
const baseurl = "http://localhost:3000";



app.get("/getemployee",(req,res)=>{

    var employee = fs.readFileSync(__dirname+"/employee.json");
    employee = JSON.parse(employee);
    employees = employee.employees;
    // console.log(employees[0]);
    res.send(employees);
});

app.get("/getproject",(req,res)=>{
    var project = fs.readFileSync(__dirname+"/project.json");
    project = JSON.parse(project);
    res.send(project.projects);

});

app.get("/getdetails/:id",(req,res)=>{

    var id = req.params.id;
    var selectedemp = null;
    var mydata= null;
    var getdet = null;
    console.log("The Id given in the url is ");
    console.log(id);
    // const promise = new Promise((resolve)=>{

              
    //        var myfunction =function(){
               
        var promise = new Promise((resolve)=>{
            
                fetch(baseurl+"/getemployee").then((response)=>  response.json()).then((allemp)=>{
            
                        const selectedemp = function(emparray){
                                    var details = emparray.filter((emp)=>{
                                    return emp.empid == id? true:false;
                                    });
                                    return details                
                            }

                // console.log("The employee data is ");
                // console.log(selectedemp(allemp));

            
            // console.log("The selected user details now is  ");
            // console.log(chalk.green(selectedemp[0].empid));
         

                        fetch(baseurl+"/getproject").then((response)=>response.json()).then((data)=>{
                                console.log(chalk.green("line46"));
                                    getdet = data.filter((singledata)=>{
                                                console.log("The length from singledata is ") 
                                                console.log(singledata.empid.length);
                                            for(var i =0;i<singledata.empid.length;i++){
                                                
                                            if(singledata.empid[i] == selectedemp(allemp)[0].empid){
                                                mydata = singledata.empid[i]
                                                break;
                                                }
                                                else{
                                                    mydata=null;
                                                }
                                            }
                                            //  console.log("line57 my data is ");
                                            //  console.log(mydata)
                                            return mydata !=null ? true:false;
                                    });
                                console.log("The user details are ");
                                console.log(getdet);
                                resolve (getdet);
                        });
                 });
        });
        
        promise.then((data)=>{
            data.forEach((singledata)=>{
                delete singledata.empid;
            });
            res.send(data);
        });


});





app.listen(3000,()=>{
    console.log(chalk.green("App running on port 3000"));
})