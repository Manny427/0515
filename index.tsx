import { useState } from 'react';
import Head from 'next/head';

const PATTERNS = [
  [/(하[요자죠네다])/g, ["하빈다", "핮욬", "햐요"]],
  [/(좋[아요])/g, ["조하", "죻아", "조아욬"]],
  [/(너무)/g, ["너므", "넘무", "너모"]],
  [/(입니다)/g, ["임미당", "입니댱", "임돠"]],
  [/(ㅋㅋ+)/g, ["ㅋㅋㅋㅋㅋ", "크크큭", "캌ㅋㅋ"]],
  [/(\!+)/g, ["!!!!", "!!~", "!><"]],
  [/(\~+)/g, ["~!~", "~~>~", "~ㅋㅋ"]],
];

const SUFFIXES = ["ㅋㅋ", "ㅋㅋㅋ", "ㅎㅎ", "!!", "~", ">ㅁ<", "><"];

function generateSinisseomStyle(sentence) {
  let result = sentence;
  let used = false;

  for (let [pattern, replacements] of PATTERNS) {
    if (pattern.test(result) && Math.random() > 0.5) {
      result = result.replace(pattern, () =>
        replacements[Math.floor(Math.random() * replacements.length)]
      );
      used = true;
    }
  }

  if (!SUFFIXES.some((suf) => result.endsWith(suf))) {
    result += " " + SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  }

  if (!used) {
    const insertPos = Math.floor(Math.random() * result.length);
    const randChar = ["ㅃ", "쀍", "ㅉ", "ㄲ", "읔"][Math.floor(Math.random() * 5)];
    result = result.slice(0, insertPos) + randChar + result.slice(insertPos);
  }

  return result;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    const result = generateSinisseomStyle(input);
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <>
      <Head>
        <title>시니어 번역기</title>
        <meta name="description" content="시니쌤 말투로 문장을 자동 변환해보세요!" />
      </Head>
      <main className="min-h-screen bg-white p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">시니어 번역기 💬</h1>

        <textarea
          className="w-full border p-4 rounded-xl text-lg"
          placeholder="여기에 일반 문장을 입력해보세요"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-pink-500 text-white py-2 rounded-xl text-lg hover:bg-pink-600"
          onClick={handleConvert}
        >
          ✨ 시니쌤 따라잡기!
        </button>

        {output && (
          <div className="mt-6 bg-pink-50 p-4 rounded-xl border border-pink-200">
            <div className="font-bold text-pink-700 mb-2">변환 결과</div>
            <p className="text-pink-800 whitespace-pre-wrap">{output}</p>
            <button
              onClick={handleCopy}
              className="mt-2 text-sm text-pink-600 underline hover:text-pink-800"
            >
              결과 복사하기
            </button>
          </div>
        )}
      </main>
    </>
  );
}
