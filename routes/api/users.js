const router = require('express').Router();

const passport = require('passport');

const usersController = require('../../controllers/usersController');


//matches with "/api/user/login"
router
.route('/login')
.post(passport.authenticate('local'), function(req,res){
    console.log(req.user);
    res.json(req.user);
})
.get(function(req, res){
    console.log(req.user);
    if(req.user){
        //If logged in, send back this flag and the fullname of user
        res.json({isLoggedIn: true, fullname: req.user.firstname+" "+req.user.lastname});
    }else{
        res.json({isLoggedIn: false, fullname: "you aren't logged in"});
    }
});

//logout route
router
.route('/logout')
.get(function(req, res){
    req.logout();
    console.log(req.user);
    res.json(false);
})

//Matches with "/api/user/:id"
// router
// .route('/:id')
// .get(usersController.findById)
// .put(usersController.update)
// .delete(usersController.remove);

//register a new user ("/api/user/register")
router
.route('/register')
.post(usersController.register);


// work with timesheets
router
    .route('/timesheets')
    .get(usersController.getTimeSheet)
    .post(usersController.setStartTime)
    .put(usersController.setEndTime)

module.exports = router;