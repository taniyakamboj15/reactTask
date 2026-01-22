import Select, { type SingleValue } from 'react-select';
import type { RoomOption } from '../../constants/rooms';
import { useSelectStyles } from '../../hooks/useSelectStyles';

type RoomSelectorProps = {
  rooms: RoomOption[];
  currentRoom: RoomOption | undefined;
  onChange: (option: SingleValue<RoomOption>) => void;
};

export const RoomSelector = ({ rooms, currentRoom, onChange }: RoomSelectorProps) => {
  const selectStyles = useSelectStyles();

  const formatOptionLabel = (option: RoomOption) => (
    <div className="flex items-center gap-2">
      <span>{option.icon}</span>
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="w-56">
      <Select
        options={rooms}
        value={currentRoom}
        onChange={onChange}
        styles={selectStyles}
        formatOptionLabel={formatOptionLabel}
        className="text-sm"
        components={{ IndicatorSeparator: () => null }}
        isSearchable={false}
      />
    </div>
  );
};

