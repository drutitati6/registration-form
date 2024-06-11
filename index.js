var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios"); // Import Axios for making HTTP requests

const app = express();

app.use(bodyParser.json());
app.use(express.static('docs'));
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log('Connected to Database'));

const VERCEL_API_BASE_URL = "https://api.vercel.com"; // Base URL for Vercel API
const VERCEL_ACCESS_TOKEN = "<YOUR_VERCEL_ACCESS_TOKEN>"; // Your Vercel Access Token

// Function to deploy a new version of a project using Vercel API
async function deployProject() {
    try {
        // Example: Deploying a project
        const response = await axios.post(`${VERCEL_API_BASE_URL}/v11/now/deployments`, {
            name: "MyProject",
            files: [{ file: "index.html", data: "<html><body>Hello World!</body></html>" }],
            version: 2, // Example version number
            teamId: "<YOUR_TEAM_ID>" // Replace with your team ID
        }, {
            headers: {
                Authorization: `Bearer ${VERCEL_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Deployment successful:", response.data);
    } catch (error) {
        console.error("Error deploying project:", error.response.data);
    }
}

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };

    db.collection('Databases').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_succes.html');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Example: Call deployProject function to deploy a project
deployProject();
