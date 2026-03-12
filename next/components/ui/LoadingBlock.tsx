'use client';

/**
 * ロード中のブロック
 */
export default function LoadingBlock({height = '5rem'} : {height?: string}) {
  return (
    <div
      className="border-4 border-gray-200 bg-gray-100 rounded-2xl m-2"
      style={{ height: height }}
    ></div>
  );
}
