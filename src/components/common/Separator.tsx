export default function Separator({ px, my }: { px?: number; my?: number }) {
  return (
    <div className={`flex justify-center px-${px}`}>
      <hr className={`my-${my} border-t border-gray-400 w-full`} />
    </div>
  );
}
