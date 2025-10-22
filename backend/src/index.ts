// Ensure admin user exists on server start
import User from './models/User';
async function ensureAdminUser() {
	const adminEmail = 'admin@kore.com';
	const adminPassword = 'REDACTED_ADMIN_PASS';
	const adminUsername = 'admin';
	let existing = await User.findOne({ email: adminEmail });
	if (!existing) {
		await User.create({ username: adminUsername, email: adminEmail, password: adminPassword, name: 'Admin' });
		console.log('Admin user created:', adminEmail);
	} else {
		existing.password = adminPassword;
		await existing.save();
		console.log('Admin user password reset:', adminEmail);
	}
}

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';
import authRoutes from './routes/auth.routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import config from './config/config';

const app = express();
const PORT = config.server.port;
app.set("trust proxy", 1); 



// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting (global)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 200,
	message: {
		success: false,
		error: 'Too many requests from this IP, please try again later.',
	},
});
app.use(limiter);

// CORS configuration
app.use(cors({ origin: ['https://kore-three.vercel.app/', 'https://kore-vercel.vercel.app/'], credentials: true }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
	res.json({ 
		success: true, 
		message: 'KORE Food Ordering System API', 
		version: '1.1.0',
		endpoints: {
			health: '/health',
			auth: '/api/auth',
			menu: '/api/menu',
			orders: '/api/orders'
		},
		timestamp: new Date().toISOString() 
	});
});

// Health check endpoint
app.get('/health', (req, res) => {
	res.json({ success: true, message: 'Food Ordering System API is running', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', authMiddleware, menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
	ensureAdminUser().then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
			console.log(`📖 API Documentation: https://kore-vercel.vercel.app/health`);
			console.log(`🍽️  Menu API: https://kore-vercel.vercel.app/api/menu`);
			console.log(`🔐  Auth API: https://kore-vercel.vercel.app/api/auth`);
			console.log(`📋 Orders API: https://kore-vercel.vercel.app/api/order`);
		});
	});
}

// For Vercel deployment
export default app;
