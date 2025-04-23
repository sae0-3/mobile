import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
import colors from "../src/theme/colors"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 100 100" 
    fill="none"
    {...props}
  >
    <Path
      fill={colors.primary}
      d="M95.3 18.9c-.3-.7-.7-1.4-1.2-1.9-.8-.8-1.9-1.4-3.1-1.5-2.2-.2-8.1 3.3-11.5 5.4-4.8 3-12 8.1-19.2 15.3L44.6 51.9c-2 2-2 5.3 0 7.3l.1.1-21.6 21.4c-2 2-2 5.3 0 7.3s5.3 2 7.3 0l63.7-63.7c1.4-1.4 1.8-3.5 1.2-5.4ZM65.5 57.3l-7.3 7.3 23.6 23.6c2 2 5.3 2 7.3 0s2-5.3 0-7.3L65.5 57.3ZM25.9 10.9l14.5 14.5.3.3c2.3 2.5 3.1 6 2.3 9.1l6.9 6.9-7.2 7.2-6.9-6.9c-3.1.8-6.6 0-9.1-2.3l-.3-.3-14.5-14.5c-.8-.8-.8-2 0-2.7.8-.8 2-.8 2.7 0l14.5 14.5c.8.8 2 1 2.8.2.8-.8.8-2.2 0-3L17.5 19.2c-.8-.8-.8-2 0-2.7.8-.8 2-.8 2.7 0l14.6 14.6c.8.8 2.1.9 3 0 .8-.8.7-2.1-.1-2.9L23.2 13.6c-.8-.8-.7-2 0-2.7.7-.8 1.9-.8 2.7 0Z"
    />
  </Svg>
)
const CutleryMemo = memo(SvgComponent)
export default CutleryMemo
