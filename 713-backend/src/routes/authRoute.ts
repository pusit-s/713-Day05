import * as authService from '../services/authService'
import * as authMiddleware from '../middleware/authMiddleware'
import express  from 'express'
import type { Request, Response } from 'express';
import type { role } from '@prisma/client';

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

export default router;