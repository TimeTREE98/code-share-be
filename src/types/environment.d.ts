declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prod';
    PORT: number;
    SESSION_SECRET: string;
  }
}
