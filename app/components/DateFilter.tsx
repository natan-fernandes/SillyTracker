import tw from 'twrnc';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-neat-date-picker';

interface DateFilterProps {
  startDate: DateTime,
  setStartDate: React.Dispatch<React.SetStateAction<DateTime>>,
  endDate: DateTime,
  setEndDate: React.Dispatch<React.SetStateAction<DateTime>>
}

export const DateFilter = (props: DateFilterProps) => {
  const getFormatedDate = (date: DateTime): string => date.toFormat('dd/MM/yyyy');

  const [showDatePickerRange, setShowDatePickerRange] = useState<boolean>(false);

  const onCancelRange = () => {
    setShowDatePickerRange(false);
  }

  const onConfirmRange = (output) => {
    setShowDatePickerRange(false);
    props.setStartDate(DateTime.fromJSDate(output.startDate));
    props.setEndDate(DateTime.fromJSDate(output.endDate));
  }

  return (
    <View style={tw`absolute z-10 h-14 w-full flex items-center justify-center`}>
      <View style={tw`top-16 h-full rounded-lg shadow-md bg-slate-50 flex items-center`}
        onTouchEnd={() => setShowDatePickerRange(true)}
      >
        <Text style={tw`ml-2 mt-1 text-red-700 font-semibold self-start`}>
          Período
        </Text>
        <Text style={tw`text-lg -mt-0.5 mx-4`}>
          <Text style={tw`font-bold`}>{getFormatedDate(props.startDate)}</Text>
          <Text>&nbsp;a&nbsp;</Text>
          <Text style={tw`font-bold`}>{getFormatedDate(props.endDate)}</Text>
        </Text>
      </View>
      <DatePicker
        isVisible={showDatePickerRange}
        mode={'range'}
        onCancel={onCancelRange}
        onConfirm={onConfirmRange}
      />
    </View>
  )
}
