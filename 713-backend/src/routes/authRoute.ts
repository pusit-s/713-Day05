import * as authService from '../services/authService'
import * as authMiddleware from '../middleware/authMiddleware'
import express  from 'express'
import type { role } from '@prisma/client'
import type { RegisterRequest } from '../models/registerRequest'

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    const {username, password} = req.body;
    const user = await authService.findByUsername(username);
    if(!user){
        res.status(401).json({messege: "User doesn't exist" });
        return
    }
    if (password === undefined || user.password === undefined || user.password === null) {
        res.status(400).json({messege: "Password is required" });
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if(!isPasswordCorrect){
        res.status(401).json({messege: "Invalid credentials"});
        return
    }
    const token = authService.generatetoken(user.id);
    res.status(200).json({
        status: 'success',
        access_token: token,
        user: {
            id: user.id,
            username: user.organizer?.name || 'unknown',
            roles: user.roles.map((role: role) => role.name)
        }
    });
})

router.get('/me', authMiddleware.protect, async (req, res) => {
    res.status(200).json({
        status: 'success',
        user: {
            id: req.body.user.id,
            username: req.body.user.organizer?.name || 'unknown',
            roles: req.body.user.roles.map((role: role) => role.name)
        }
    });
})

router.post('/admin', authMiddleware.protect, authMiddleware.checkAdmin, async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You are an admin'
    });
})

router.post('/register', async (req, res) => {
    const registerRequest: RegisterRequest = req.body;
    try {
        const responseUser = await authService.registerUser(registerRequest);
        res.status(201).json({
            status: 'success',
            user: {
                id: responseUser.id,
                organizerName: responseUser.organizer?.name || 'unknown',
                username: responseUser.username,
                roles: responseUser.roles.map((role: role) => role.name)
            }
        });
        } catch (error) {
        res.status(500).json({status: 'error', message: 'Internal server error'});
    }
})

export default router;