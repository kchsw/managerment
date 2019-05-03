const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'shabi'
const mongoose = require('mongoose')
require("../database/schema/User.js")
const User = mongoose.model('User')

module.exports = passport => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	    // console.log(jwt_payload)
	    User.findById(jwt_payload.id)
	    	.then(user => {
	    		if(user){
	    			return done(null, user)
	    		}
	    		return done(null, false)
	    	})
	    	.catch(err => console.log(err))
	}));
}