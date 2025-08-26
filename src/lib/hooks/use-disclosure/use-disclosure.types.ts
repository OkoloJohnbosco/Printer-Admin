export type StateType = [boolean, () => void, () => void, () => void] & {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onSetOpen: (value: boolean) => void;
};
