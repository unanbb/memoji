export default function MemoLoadErrorFallback() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">
            메모를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      </div>
    </>
  );
}
