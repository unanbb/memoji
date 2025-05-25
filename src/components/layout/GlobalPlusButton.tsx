'use client';
import PlusButton from '../common/plusButton';

export default function GlobalPlusButton() {
  const handleClick = () => {
    console.log('handleClick');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <PlusButton onClick={handleClick} />
    </div>
  );
}
