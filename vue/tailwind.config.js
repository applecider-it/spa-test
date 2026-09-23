/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,vue}'],
  // パージされても残しておきたいクラスを指定
  // 正規表現でまとめて書ける
  safelist: [
    {
      pattern: /bg-(red|blue)-200/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
