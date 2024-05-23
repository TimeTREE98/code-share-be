declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prod';
    PORT: number;
    SESSION_SECRET: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
