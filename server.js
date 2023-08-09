import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import DefaultData from './default.js';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import GoogleStrategy from 'passport-google-oauth20';



dotenv.config();

const app=express();



passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
	    function (accessToken, refreshToken, profile, callback) {
            console.log(accessToken);
            console.log(refreshToken);
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,POST,PUT,DELETE',
    credentials:true,
}));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', Router);
const PORT=process.env.PORT || 8000;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

   

Connection(USERNAME,PASSWORD);

app.listen(PORT,()=>console.log(`Server hello is running successfully on PORT ${PORT}`));
DefaultData();
