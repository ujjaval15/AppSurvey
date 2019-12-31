const  keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // console.log(req.body);

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: 'Charge for AppSurvey',
        });
        console.log(charge);
        //We can access current user using req.user added by passport in req 
        req.user.credits += 5;
        const user = await req.user.save();
        //send back to browser
        res.send(user);
    });
}