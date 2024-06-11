var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios"); 

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

const VERCEL_API_BASE_URL = "https://registration-form-2u1t2k2vq-drutis-projects.vercel.app"; 
const VERCEL_ACCESS_TOKEN = "aFsFWBb9YXvZdWPimcU5gimN"; 

// Function to deploy a new version of a project using Vercel API
async function deployProject() {
    try {
      
        const response = await axios.post(`${VERCEL_API_BASE_URL}/v11/now/deployments`, {
            name: "MyProject",
            files: [{ file: "index.html", data: "<html><body>Hello World!</body></html>" }],
            version: 2, // Example version number
           
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


deployProject();
