export default ({ env }) => {
  // LOCAL → SQLite
  if (env('NODE_ENV') === 'development') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: '.tmp/data.db',
        },
        useNullAsDefault: true,
      },
    };
  }

  // PRODUCCIÓN → Postgres (Render)
  return {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', true)
          ? { rejectUnauthorized: false }
          : false,
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
};
