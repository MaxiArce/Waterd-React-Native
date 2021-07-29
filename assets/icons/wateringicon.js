import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const WateringIcon = (props) => {
  return (
    <Svg
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M18.86 3.966a2.836 2.836 0 00-.663 3.063l-3.337 3.337V8c0-.629-.515-1.143-1.143-1.143H12.54c.034-.194.034-.377.034-.571A6.282 6.282 0 006.288 0a6.282 6.282 0 00-4 11.131v7.155c0 .628.514 1.143 1.143 1.143h10.286c.628 0 1.143-.515 1.143-1.143v-4.697l4.948-4.949c1.029.4 2.229.194 3.052-.64l-4-4.034zM2.345 6.857c-.023-.194-.057-.377-.057-.571 0-2.206 1.794-4 4-4s4 1.794 4 4c0 .194-.034.377-.057.571H2.345zm10.229 10.286h-8v-8h8v8z"
          fill="#000"
          stroke="#fff"
          strokeWidth={1.2}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v19.429H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default WateringIcon
