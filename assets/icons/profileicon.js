import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileIcon = (props) => {
  return (
    <Svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 11a5 5 0 100-10 5 5 0 000 10z"
        stroke="#000"
        strokeWidth={1.2}
      />
      <Path
        d="M15 13h.352a3 3 0 012.976 2.628l.391 3.124A2.002 2.002 0 0116.734 21H3.266a2 2 0 01-1.985-2.248l.39-3.124A3 3 0 014.65 13H5"
        stroke="#000"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ProfileIcon