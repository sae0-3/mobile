import { View } from 'react-native'
import { ContainerProps } from './types'
import CoffeMemo from '../../../assets/Coffe'
import FoodMemo from '../../../assets/Food'
import CutleryMemo from '../../../assets/Cutlery'
import { FunctionComponent } from 'react'

export default function Container({ children, className }: ContainerProps) {
  return (
    <View className={`flex-1 relative`}>
        <View className='h-[100vh] w-full absolute'>
          <View className="absolute -top-10 -left-10 opacity-35 rotate-12">
            <CoffeMemo width={300} height={300} />
          </View>

          <View className="absolute bottom-1/4 left-2/3 opacity-35 rotate-45 ">
            <FoodMemo width={250} height={250} />
          </View>

          <View className="absolute bottom-0 right-2/3 opacity-35 -rotate-12">
            <CutleryMemo width={250} height={250} />
          </View>
        </View>

      <View className={`flex-1 z-10 justify-center px-32 ${className}`}>
        {children}
      </View>
    </View>
  )
}
