import { LDClient, initialize, LDContext } from 'launchdarkly-js-client-sdk'
import type { User } from '../../../app'
import type { LoggerService } from '../../logger/logger'
import { FeatureFlag, FeatureFlagService, OnChangeFeatureHandler } from '../feature'

export interface UserIdentity {
  kind: 'user'
  key: string
  name: string
  age: number
  country: string
}

export class LaunchDarkly implements FeatureFlagService {
  private client: LDClient
  private isReady: boolean = false
  
  constructor(
    clientSideID,
    getClient: typeof initialize,
    private logger: LoggerService
  ) {
    this.client = getClient(clientSideID, this.anonymousIdentity())
    this.client.setStreaming(true)
    this.client.on('initialized', () => {
      this.logger.log('Feature flag service: successfully initialized')
      this.isReady = true
    })
    this.client.on('failed', () => {
      this.logger.error('Feature flag service: failed to initialize')
    })
  }
  
  flag<T extends FeatureFlag>(name: string, defaultValue: T): T {
    if (!this.isReady) return defaultValue
    const flag: T = this.client.variation(name, defaultValue)
    const currentContext: LDContext = this.client.getContext()
    this.logger.log(`Feature flag service: user "${currentContext.key}" get flag ${name}=${JSON.stringify(flag)}`)
    return flag
  }

  onChange(fn: OnChangeFeatureHandler): void {
    this.client.on('change', () => fn())
  }
  
  setUser(user?: User) {
    const currentContext: LDContext = this.client.getContext()
    const context: LDContext = user ? this.userIdentity(user) : this.anonymousIdentity()
    if (currentContext?.key === context.key) return
    this.logger.log(`Feature flag service: switch user from ${currentContext?.key} to ${context.key}`)
    this.client.identify(context)
  }
  
  private userIdentity(user: User): UserIdentity {
    return {
      kind: 'user',
      key: user.uuid,
      name: user.name,
      age: user.age,
      country: user.country,
    }
  }
  
  private anonymousIdentity(): UserIdentity {
    return {
      kind: 'user',
      key: 'anonymous',
      name: 'John Doe',
      age: 0,
      country: 'world',
    }
  }
}
