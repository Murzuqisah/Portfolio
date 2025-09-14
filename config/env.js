import dotenv from 'dotenv';

export const initializeEnv = () => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
    }

    const requiredEnvVars = ['API_KEY', 'SECRET_KEY', 'GMAIL_USER', 'GMAIL_PASS'];
    const missingEnvVars = requiredEnvVars.filter(envVar => {
        if (!process.env[envVar]) {
            console.error(`Environment variable ${envVar} is missing.`);
            return true;
        }
        console.log(`Environment variable ${envVar} is set.`);
        return false;
    });

    if (missingEnvVars.length > 0) {
        console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        process.exit(1);
    }
};