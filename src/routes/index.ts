
import express from "express";
import usersRoutes from './users.routes'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import todosRoutes from './todos.routes'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/todos', todosRoutes);

export default router;