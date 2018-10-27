export const ServerURL = `http://localhost:${PORT}`;

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3003;