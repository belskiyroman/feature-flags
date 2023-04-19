import { useEffect, useState } from 'react'
import { useUser } from '../../mock-data'
import { feature } from '../../services/feature'
import { FeatureFlag } from '../../services/feature/feature'

export const useFeature = <T extends FeatureFlag>(name: string, defaultValue: T): T => {
  const [flag, setFlag] = useState<T>(feature.flag(name, defaultValue))
  const user = useUser()
  
  useEffect(() => {
    feature.setUser(user)
  }, [user])

  useEffect(() => {
    feature.onChange(() => {
      setFlag(feature.flag(name, defaultValue))
    })
  }, [setFlag, defaultValue, name])
  
  return flag
}
