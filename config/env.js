import dotenv from 'dotenv';

export const initializeEnv = () => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
    }

    // Optional: Check for important environment variables but don't crash if missing
    // This allows the static portfolio to serve without all env vars configured
    const emailEnvVars = ['GMAIL_USER', 'GMAIL_PASS'];
    const missingEmailVars = emailEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEmailVars.length > 0 && process.env.NODE_ENV === 'production') {
        console.warn(`Missing email environment variables: ${missingEmailVars.join(', ')}. Email functionality will be disabled.`);
    }
};
