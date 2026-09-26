import path from 'path';
import { parse } from 'pg-connection-string';

export default ({ env }) => {
  // Configuración para PRODUCCIÓN (Render)
  if (env('NODE_ENV') === 'production') {
    const config = parse(env('DATABASE_URL'));
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false, // Necesario para bases de datos en la nube
          },
        },
        debug: false,
      },
    };
  }

  // Configuración LOCAL (Tu ordenador)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};
