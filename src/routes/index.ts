
import express from "express";
import usersRoutes from './users.routes'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);



export default router;