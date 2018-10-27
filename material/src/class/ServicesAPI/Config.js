const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : '3003';
console.log(process.env.NODE_ENV );
console.log(process.env.PORT);

export const ServerURL = `http://localhost:${PORT}`;