import { User } from '../../app'

export type OnChangeFeatureHandler = () => void
export type FeatureFlag = string | boolean

export interface FeatureFlagService {
  flag(name: string, defaultValue?: FeatureFlag): FeatureFlag
  onChange(fn: OnChangeFeatureHandler): void
  setUser(user?: User)
}
