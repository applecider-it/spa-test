/** @type {import('tailwindcss').Config} */
export default {
  // パージされても残しておきたいクラスを指定
  // 正規表現でまとめて書ける
  safelist: [
    {
      pattern: /bg-(red|blue)-200/,
    },
  ],
};
