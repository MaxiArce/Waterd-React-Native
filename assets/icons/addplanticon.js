import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AddPlantIcon = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0zm0 6a.9.9 0 00-.892.778L11.1 6.9v4.2H6.9a.9.9 0 00-.122 1.792l.122.008h4.2v4.2a.9.9 0 001.792.122l.008-.122v-4.2h4.2a.9.9 0 00.122-1.792L17.1 11.1h-4.2V6.9A.9.9 0 0012 6z"
        fill="#314A36"
      />
    </Svg>
  )
}

export default AddPlantIcon
