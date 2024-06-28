const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "ArvindisAgoodBoyAndHandSomeAlso";

//ROUTE:1 -> create a user using : POST "/api/auth/createuser". No login required
router.post("/createuser",[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5}),
  ],
  async (req, res) => {
    //If there are errors return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //check the user with the same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({error:"Sorry a user already exists" });
      }

      //creating hashing for password
      const salt = await bcrypt.genSalt(10);
      securedPassword = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
});

//ROUTE :2 -> Authenticate a user using :POST "/api/auth/login". No login required
router.post("/login",[
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password can not be blanked ").exists(),
], async (req, res) => {
  //If there are errors return bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
       return res.status(400).json({ success,errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
      let user  = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credential"});
      }

      const passwordCompare =await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success,error:"Please try to login with correct credential"});
        
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
  } catch (error) {

    console.log(error.message);
    res.status(500).send("Internal server error");
  }

});

//ROUTE:3 -> Get logged in user details using POST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser, async (req, res) => {
    
  try {

    userId = req.user.id;
    const user  =  await User.findById(userId).select("-password");
    res.send(user);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
    
  }


});

module.exports = router;
