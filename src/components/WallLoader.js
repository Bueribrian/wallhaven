import React from "react"
import ContentLoader from "react-content-loader"

const WallLoader = (props) => (
    <ContentLoader 
    rtl
    speed={2}
    width={330}
    height={230}
    viewBox="0 0 330 230"
    backgroundColor="#ededed"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="320" height="220" />
  </ContentLoader>
)

export default WallLoader