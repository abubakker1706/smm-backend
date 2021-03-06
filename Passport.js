
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkdinStrategy=require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy=require('passport-twitter').Strategy
const dotenv=require('dotenv')
dotenv.config()

const User = require('./model/User')
const FACEBOOK_APP_ID=process.env.FACEBOOK_APP_ID
const FACEBOOK_APP_SECRET=process.env.FACEBOOK_APP_SECRET

const LINKDIN_APP_ID= process.env.LINKDIN_APP_ID
const LINKDIN_APP_SECRET=process.env.LINKDIN_APP_SECRET
const TWITTER_APP_ID=process.env.TWITTER_APP_ID
const TWITTER_APP_SECRET=process.env.TWITTER_APP_SECRET
const passport = require("passport");
passport.use(new FacebookStrategy({
                         clientID: FACEBOOK_APP_ID,
                         clientSecret: FACEBOOK_APP_SECRET,
                         callbackURL:"/auth/facebook/callback",
                         profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
                        
                       },
                       function(token, refreshToken, profile, done) {
 
                        // asynchronous
                        process.nextTick(function() {
                     
                            // find the user in the database based on their facebook id
                            User.findOne({ 'uid' : profile.id }, function(err, user) {
                     
                                // if there is an error, stop everything and return that
                                // ie an error connecting to the database
                                if (err)
                                    return done(err);
                     
                                // if the user is found, then log them in
                                if (user) {
                                    console.log("user found")
                                    console.log(user)
                                    return done(null, user); // user found, return that user
                                } else {
                                    // if there is no user found with that facebook id, create them
                                    var newUser            = new User();
                     
                                    // set all of the facebook information in our user model
                                    newUser.uid    = profile.id; // set the users facebook id                  
                                                  
                                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                                    
                                    newUser.pic = profile.photos[0].value
                                    // save our user to the database
                                    newUser.save(function(err) {
                                        if (err)
                                            throw err;
                     
                                        // if successful, return the new user
                                        return done(null, newUser);
                                    });
                                }
                     
                            });
                     
                        })
                     
                    }));
                    
                    passport.serializeUser(function(user, done) {
                      done(null, user.id);
                  });
                   
                  // used to deserialize the user
                  passport.deserializeUser(function(id, done) {
                      User.findById(id, function(err, user) {
                          done(err, user);
                      });
                  });


// Linkedin connect//

passport.use(new LinkdinStrategy({
                         clientID: LINKDIN_APP_ID,
                         clientSecret: LINKDIN_APP_SECRET,
                         callbackURL:"/auth/linkdin/callback",
                         scope: ['r_emailaddress', 'r_liteprofile'],
                         //profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
                        
                       },
                       function(token, refreshToken, profile, done) {
 
                        // asynchronous
                        process.nextTick(function() {
                     
                            // find the user in the database based on their facebook id
                            User.findOne({ 'uid' : profile.id }, function(err, user) {
                     
                                // if there is an error, stop everything and return that
                                // ie an error connecting to the database
                                if (err)
                                    return done(err);
                     
                                // if the user is found, then log them in
                                if (user) {
                                    console.log("user found")
                                    console.log(user)
                                    return done(null, user); // user found, return that user
                                } else {
                                    // if there is no user found with that facebook id, create them
                                    var newUser            = new User();
                     
                                    // set all of the facebook information in our user model
                                    newUser.uid    = profile.id; // set the users facebook id                  
                                                  
                                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                                    
                                    newUser.pic = profile.photos[0].value
                                    // save our user to the database
                                    newUser.save(function(err) {
                                        if (err)
                                            throw err;
                     
                                        // if successful, return the new user
                                        return done(null, newUser);
                                    });
                                }
                     
                            });
                     
                        })
                     
                    }));
                    
                    passport.serializeUser(function(user, done) {
                      done(null, user.id);
                  });
                   
                  // used to deserialize the user
                  passport.deserializeUser(function(id, done) {
                      User.findById(id, function(err, user) {
                          done(err, user);
                      });
                  });

//PininterestStrategy


