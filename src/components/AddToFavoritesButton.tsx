// AddToFavoritesButton.tsx
import React from 'react';

interface AddToFavoritesButtonProps {
  userId: number | null;
  cityKey: number | null;
  display: boolean;
  onAdd: () => void; // Assuming you're handling the cityKey check outside or inside this function
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ userId, cityKey, display, onAdd }) => {
  return (
    <button onClick={onAdd} disabled={!userId || !cityKey} className={display ? 'd-block' : 'd-none'}>
      Add to Favorites
    </button>
  );
};

export default AddToFavoritesButton;
