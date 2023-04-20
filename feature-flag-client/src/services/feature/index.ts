import { initialize } from 'launchdarkly-js-client-sdk'
import { logger } from '../logger'
import { LaunchDarkly } from './providers/LaunchDarkly'

// use index file instead of the factory pattern
export const feature = new LaunchDarkly(
  process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID,
  initialize,
  logger,
)
