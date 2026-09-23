export default () => ({
  web: {
    port: parseInt(process.env.WEB_PORT || '4000', 10),
    cors: {
      origin: true, // リクエスト元のOriginをそのまま許可
      credentials: true, // ←これ必須
    },
  },
  session: {
    name: process.env.SESSION_NAME || 'spatestsess',
    secret: process.env.SESSION_SECRET || 'secret-key',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
