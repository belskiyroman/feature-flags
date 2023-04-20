import React from 'react';
import { useFeature } from '../effects/feature/useFeature'
import { detailsCtaFlagKey } from '../feature-flag-config'

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const color = useFeature<string>(detailsCtaFlagKey, 'unset')
  return (
    <button style={{ backgroundColor: color }}>Request doctor review</button>
  )
}
