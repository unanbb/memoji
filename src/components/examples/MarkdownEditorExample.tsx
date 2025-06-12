import LexicalMarkdownEditor from '@/components/memo-editor/LexicalMarkdownEditor/LexicalMarkdownEditor';
import { useState } from 'react';

export default function MarkdownEditorExample() {
  const [content, setContent] = useState(
    '# 제목\n\n여기에 마크다운 내용을 입력하세요...\n\n- 목록 항목 1\n- 목록 항목 2\n\n**굵은 글씨**와 *기울어진 글씨*도 사용할 수 있습니다.',
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lexical Markdown Editor 예제</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">에디터</h2>
        <LexicalMarkdownEditor
          value={content}
          onChange={value => setContent(value || '')}
          placeholder="마크다운 내용을 입력하세요..."
          autoFocus={true}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">생성된 마크다운</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{content}</pre>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">기능</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>React Icons을 사용한 직관적인 툴바 UI</li>
          <li>텍스트 포맷팅 (굵게, 기울게, 밑줄, 취소선)</li>
          <li>제목 (H1, H2, H3) 지원</li>
          <li>순서 있는/없는 목록</li>
          <li>인용구 (Quote)</li>
          <li>코드 블록 (다양한 언어 지원)</li>
          <li>링크 자동 감지 및 삽입</li>
          <li>마크다운 단축키 지원 (예: **굵게**, *기울게*, # 제목)</li>
          <li>실시간 마크다운 변환</li>
          <li>Undo/Redo 기능</li>
          <li>텍스트 정렬 (왼쪽, 가운데, 오른쪽, 양쪽 정렬)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">단축키</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">텍스트 포맷팅</h3>
            <ul className="text-sm space-y-1">
              <li>
                <code>**텍스트**</code> - 굵게
              </li>
              <li>
                <code>*텍스트*</code> - 기울게
              </li>
              <li>
                <code>`코드`</code> - 인라인 코드
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">블록 요소</h3>
            <ul className="text-sm space-y-1">
              <li>
                <code># 제목</code> - H1
              </li>
              <li>
                <code>## 제목</code> - H2
              </li>
              <li>
                <code>- 항목</code> - 목록
              </li>
              <li>
                <code>&gt; 인용</code> - 인용구
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
