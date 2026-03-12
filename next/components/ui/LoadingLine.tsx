'use client';

/**
 * ロード中のライン
 */
export default function LoadingLine() {
  return (
    <span
      className="border-2 border-gray-200 bg-gray-100 inline-block rounded"
      style={{ width: '40px', height: '0.8rem' }}
    ></span>
  );
}
