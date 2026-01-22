import { useMemo } from 'react';
import type { StylesConfig } from 'react-select';
import type { RoomOption } from '../constants/rooms';

export const useSelectStyles = () => {
  return useMemo<StylesConfig<RoomOption, false>>(
    () => ({
      control: (base) => ({
        ...base,
        backgroundColor: 'rgba(39, 39, 42, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: 'var(--color-text-primary)',
        boxShadow: 'none',
        minHeight: '38px',
        borderRadius: '10px',
        ':hover': { 
          borderColor: 'rgba(59, 130, 246, 0.3)',
          backgroundColor: 'rgba(39, 39, 42, 0.7)'
        }
      }),
      singleValue: (base) => ({
        ...base, 
        color: 'var(--color-text-primary)',
        fontWeight: '600'
      }),
      input: (base) => ({ ...base, color: 'var(--color-text-primary)' }),
      menu: (base) => ({ 
        ...base, 
        backgroundColor: '#18181b',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
        color: 'var(--color-text-primary)',
        fontWeight: state.isSelected ? '600' : '500',
        ':active': {
          backgroundColor: 'rgba(59, 130, 246, 0.25)'
        }
      }),
    }),
    []
  );
};

