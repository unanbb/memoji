export function NotFoundMemos() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">메모가 없습니다</h2>
        <p className="text-gray-500 leading-relaxed">새로운 메모를 추가해보세요.</p>
      </div>
    </div>
  );
}
