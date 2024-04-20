// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import User from '../models/UserModel';
// import { Profile } from 'passport';
// import { Request } from 'express';

// passport.serializeUser((user: any, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id: string, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });

// // Google OAuth Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: '/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//             user = await User.create({
//                 googleId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails![0].value
//             });
//         }
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

// // GitHub OAuth Strategy
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID!,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     callbackURL: '/auth/github/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ githubId: profile.id });
//         if (!user) {
//             user = await User.create({
//                 githubId: profile.id,
//                 displayName: profile.username,
//                 email: profile.emails![0].value
//             });
//         }
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

// // Facebook OAuth Strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID!,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'photos', 'email']
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ facebookId: profile.id });
//         if (!user) {
//             user = await User.create({
//                 facebookId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails![0].value
//             });
//         }
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

// Documentation:
// This TypeScript file sets up the Passport strategies for Google, GitHub, and Facebook.
// It handles the serialization and deserialization of user instances for session management.
// For each OAuth provider, it checks if a user exists in the database; if not, it creates a new user.
