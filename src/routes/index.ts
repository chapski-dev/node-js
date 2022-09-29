
import express from "express";
import usersRoutes from './users.routes'
import userRoutes from './user.routes'


const router = express.Router();

router.use('/users', usersRoutes);
router.use('/user', userRoutes);


export default router;