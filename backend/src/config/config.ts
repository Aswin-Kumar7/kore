export const config = {
	server: {
		port: process.env.PORT || 3001,
	},
	mongoUri: process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority',
	jwt: {
		secret: process.env.JWT_SECRET || 'REDACTED_JWT_SECRET',
		expiresIn: process.env.JWT_EXPIRES_IN || '1d',
	},
	smtp: {
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		user: 'smtp-user@example.com', 
		pass: 'REDACTED_SMTP_PASS', 
		from: 'KORE Food Ordering System <smtp-user@example.com>', 
		allowSelfSigned: true, 
		ignoreTLS: false, 
		devMode: true, 
	},
} as const;

export type AppConfig = typeof config;
export default config;

