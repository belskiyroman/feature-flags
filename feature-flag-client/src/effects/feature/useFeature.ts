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

      // just for fun!
      console.warn('!!! 1000 flags !!! - get 100+ feature flags in a loop on each change for each flag. This still working well!')
      const benchmark = '1000 times to get flag took'
      console.time(benchmark)
      for(let i = 0; i < 1000; i++) {
        feature.flag(name, defaultValue)
      }
      console.timeEnd(benchmark)
      

      setFlag(feature.flag(name, defaultValue))
    })
  }, [setFlag, defaultValue, name])
  
  return flag
}
