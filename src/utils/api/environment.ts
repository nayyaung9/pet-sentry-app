import {ENVIRONMENT} from '@env';

const isDevelopment =
  __DEV__ || ['development'].some(channel => ENVIRONMENT === channel);

const isRelease = ['release'].some(channel => ENVIRONMENT === channel);

const mapEnvironment = <T = unknown>({
  release,
  development,
}: {
  release: T;
  development?: T;
}): T => {
  if (isDevelopment) {
    if (development) {
      return development;
    } else {
      throw new Error('Development environment but no development handler');
    }
  }

  if (isRelease) {
    return release;
  }

  throw new Error(
    'Environment not set. Please set the environment in the .env file.',
  );
};

export {mapEnvironment, isDevelopment, isRelease};
