import { create } from 'zustand';

interface AppState {
  apiChecked: boolean;
  setApiChecked: (checked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  apiChecked: false,
  setApiChecked: (checked) => set({ apiChecked: checked }),
}));
