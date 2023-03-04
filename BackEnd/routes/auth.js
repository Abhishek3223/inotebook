const Express = require("express");
const router = Express.Router();
const USER = require("../models/userSchema")
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUSER = require('../Middleware/FtechUsers')
const JWT_SECRET = "HELOOABHUSHEK%%";

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// ROUTE 1: CREATE A USER
router.post('/CreatUSER',

    [
        //  these are validation check..
        body('email', 'invalid mail').isEmail(),
        body('name', 'minimum word requirement is 5').isLength({ min: 5 }),
        body('password', 'invalid ! it must be atleast of 5 words').isLength({ min: 5 }),
    ],

    async (req, res) => {

        const errors = validationResult(req);
        let Success = true;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await USER.findOne({ email: req.body.email });

        // checking if the user already exists or not 
        if ((user)) {
            // if yes then give a this msg
            return res.status(400).json(
                {
                    Success: false,
                    error: "sorry but the email address is already been rejistered"
                }
            );
        }
        else {

            try {
                const salt = await bcrypt.genSalt(10); //salt creation
                const secPass = await bcrypt.hash(req.body.password, salt);// new password creation using bcrpt to incrpyt and add salt to it


                // this is new user creation 
                user = await USER.create({
                    name: req.body.name,
                    password: secPass, // here instead of usig the passsword we are using the after addign salt and incrypting it....
                    email: req.body.email

                })
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const AUTH_TOKEN = jwt.sign(data, JWT_SECRET)

                // console.log(user);
                console.log(AUTH_TOKEN)
                res.json({ AUTH_TOKEN, Success });


            } catch (error) {
                console.log(`Error occouerd !! -- ${error}`);
            }

            console.log("success");

        }
    })

//ROUTE 2: CREATING A LOGIN ENDPOINT ---AUTHENTICATE THE USER ----------------------

router.post('/Login',

    [
        //  these are validation check..

        body('email', 'invalid mail').isEmail(),
        body('password', 'Enter the password').exists(),
    ],

    async (req, res) => {

        let Success = true;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        try {

            let user = await USER.findOne({ email: req.body.email });
            if (!(user)) {
                // if user doesnot exists then give a this msg
                Success = false;
                return res.status(400).json(
                    {
                        "error": "please try again invalid credetials"
                    })
            }

            //  if the user exists compare the two password
            const compareResults = await bcrypt.compare(password, user.password)
            // here compare(entered_password,hash_password_stored)

            if (!(compareResults)) {
                // if passowrd doesnot  macth
                Success = false;
                return res.status(400).json(
                    {
                        "error": "please try again invalid credetials"
                    })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const AUTH_TOKEN = jwt.sign(data, JWT_SECRET)

            // console.log(user);
            console.log(AUTH_TOKEN)
            res.json({ AUTH_TOKEN, Success })

        } catch (error) {
            console.log("Eroor occoured !!")
            res.status(400).json(error)
        }

    })


//ROUTE 3 : GETTING THE DETAILS FROM THE TOKEN FOUND ---------------------
router.post('/GetUser', fetchUSER, async (req, res) => {

    try {
        var userId = req.user.id
        const user = await USER.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log("Error occoured !!")
        res.status(401).json(error)
    }

})

module.exports = router