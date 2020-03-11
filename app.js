const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util")
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Store team data
const team = [];

// run the menu options
function menu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: ["Add Manager", "Add Engineer", "Add Intern", "Create Profile", "Exit"]
    }).then(async function(response){

        if(response.action === "Add Engineer"){
            await addEngineer();
        }
        else if(response.action === "Add Intern"){
            await addIntern();
        }
        else if(response.action === "Add Manager"){
            await addManager();
        }
        else if(response.action === "Create Profile"){
            await createProfile();
        }

        else{
            return;
        }
        menu();
    })

}
// Ensure user did not leave a filed blank
const check = async function(input){
    if(input === ''){
        return "Field cannot be blank";
    }
    return true;
}
// Add Manager data
async function addManager(){
    await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Manager name:",
            validate: check
        },
        {
            name: "ID",
            type: "input",
            message: "Manager ID:",
            validate: check
        },
        {
            name: "email",
            type: "input",
            message: "Manager Email:",
            validate: check
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Manager Office Number:",
            validate: check
        }
    ]).then((response)=>{
        const manager = new Manager(response.name, response.ID, response.email, response.officeNumber);
        team.push(manager);
    })
}

// Add Engineer data
async function addEngineer(){
    await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Engineer name:",
            validate: check
        },
        {
            name: "ID",
            type: "input",
            message: "Engineer ID:",
            validate: check
        },
        {
            name: "email",
            type: "input",
            message: "Engineer Email:",
            validate: check
        },
        {
            name: "github",
            type: "input",
            message: "Engineer Github account:",
            validate: check
        }
    ]).then((response)=>{
        const engineer = new Engineer(response.name, response.ID, response.email, response.github);
        team.push(engineer);
    })
}

// Add intern data
async function addIntern(){
    await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Intern name:",
            validate: check
        },
        {
            name: "ID",
            type: "input",
            message: "Intern ID:",
            validate: check
        },
        {
            name: "email",
            type: "input",
            message: "Intern Email:",
            validate: check
        },
        {
            name: "school",
            type: "input",
            message: "Intern School:",
            validate: check
        }
    ]).then((response)=>{
        const intern = new Intern(response.name, response.ID, response.email, response.school);
        team.push(intern);
    })
}

// Create the portfolio file
async function createProfile(){
    const writeFileAsync = util.promisify(fs.writeFile);
    const HTML = await createHTML();
    await writeFileAsync("./output/team.html", HTML);
}

// write the HTML for team.html
async function createHTML(){
    // head section
    let HTML = 
    `<!DOCTYPE html>
    <html>
        <head>
            <title>
                My team
            </title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            <style>
                .header{
                    background-color:#ff344f;
                    height: 100px;
                }
                h1{
                    text-align: center;
                    padding: 22px;
                    color: white;
                }
                .padded-container {
                padding: 50px;
                padding-left: 100px;
                padding-right: 100px;
                }
                .card-title{
                    background-color:blue;
                    text-align:center;
                    color: white;
                }
                .row{
                    margin: 20px;
                }
            </style>
        </head>
        <body>
    
            <header class = "header">
                <h1>My Team</h1>
            </header>
            <div class = "padded-container">
            `
    // create the div sections for each team member
    for (let i = 0; i < team.length; i++){

        if (i % 3 === 0){
            HTML = HTML.concat(
                `<div class = "row justify-content-center">`
            )
        }
        HTML = HTML.concat(
                    `<div class = "col-sm-4">
                        <div class = "card">    
                            <header class = "card-title">
                                <h3 class = "card-title">
                                    ${team[i].name}
                                </h3>
                                <h6 class = "card-subtitle">${team[i].getRole()}</h6>
                            </header>
                            
                            <div class = "card-body">
                                <div class = "container">
                                    <div class = "row">
                                        <a>ID: ${team[i].id}</a>
                                    </div>
                                    <div class = "row">
                                        <a>Email: ${team[i].email}</a>
                                    </div>
                                    <div class = "row">
                                        <a>${getUniqueToken(team[i])}</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
        )
    if (i % 3 == 2){
        HTML = HTML.concat(
                    `</div>`);
    }

    HTML = HTML.concat(
        `        </div>
        </body>
    </html>`
    )
    }
    return HTML;
}

// Gets the information unique to each type of employee
// All common data is gathered during the HTML creation process.
function getUniqueToken(employee){
    switch(employee.getRole()){
        case "Manager":
            return "Office Number: " + employee.officeNumber;
        case "Engineer":
            return "Github: "+ employee.github;
        default:
            return "School: "+ employee.school;
    }
}

menu();
