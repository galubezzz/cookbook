const env = process.env.NODE_ENV;

export const baseUrl = env === 'development' ? 'http://127.0.0.1:8000' : 'https://18.222.87.201';

console.log('=======', process.env.NODE_ENV);