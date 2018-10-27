const PORT = process.env.CLIENT_NODE_ENV === 'production' ? process.env.PORT : '3003';

export const ServerURL = `http://localhost:${PORT}`;