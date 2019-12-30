const passport = require('passport');


module.exports = app => {
    //http://localhost:5000/auth/google,  return URl with code 
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    ); // return URLs with code 


    //URLs call back with code and other information
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); //passport assign logout method 
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        //res.send(req.session);
    });
}