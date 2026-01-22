export type RoomId = 'general' | 'random' | 'engineering';

export type RoomOption = {
  value: RoomId;
  label: string;
  icon: string;
};

export const ROOMS: RoomOption[] = [
  { value: 'general', label: ' General', icon: '💬' },
  { value: 'random', label: 'Random', icon: '🎲' },
  { value: 'engineering', label: 'Engineering', icon: '⚡' },
];

