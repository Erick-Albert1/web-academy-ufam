import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    LOG_DIR: str(),
  });
}

export default validateEnv;
