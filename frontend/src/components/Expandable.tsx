import { useState } from 'react';
import { View, Pressable, Text, ViewStyle } from 'react-native';
import { Icon } from './Icon';
import colors from '../theme/colors';

interface ExpandableProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  presableClassName?: string;
}

export const Expandable = ({ title, children, className, presableClassName }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className={`${className} mb-4`}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className={`${presableClassName} flex-row justify-between items-center border-b-2 mx-2 border-primary py-3`}
      >
        <Text className="text-lg font-bold">{title}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          color={colors.primary}
        />
      </Pressable>

      {expanded && (
        <View className="mt-2">
          {children}
        </View>
      )}
    </View>
  );
};
