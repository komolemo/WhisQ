import React, { useState, useEffect } from 'react';
import Problems from '../data/problems.json';

const Circle = () => {
    const [isDetailOpened, setDetailOpend] = useState(false);
    const [item, setItem] = useState(Problems[0]);

    const diameter = 12;
    const w1 = `w-[${diameter*2}rem]`;
    const h1 = `h-[${diameter}rem]`;
    const h2 = `h-[${diameter*3}rem]`;
    const h3 = `h-[${diameter*4}rem]`;

    const textCss = `
        0:text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px]
        tracking-[0.125em] text-gray-400 w-[80%] mx-auto
    `; // leading-relaxed
    return (
        <div
            class={`relative w-[24rem]  p-8 ${isDetailOpened ? 'h-[48rem] scale-[1.3]' : 'h-[24rem]' }`}
            onClick={() => setDetailOpend(!isDetailOpened)}
        >
            {/* <!-- 上部の半円 --> */}
            <div className={`absolute top-0 left-0 w-[24rem] h-[12rem] bg-[#E6F6FD] z-0 rounded-t-full`}></div>
            {/* <!-- 下部の四角形 --> */}
            <div className={`
                absolute left-0 bottom-0
                w-[24rem] ${isDetailOpened ? 'h-[36rem]' : 'h-[12rem] rounded-b-full'}
                bg-[#E6F6FD] z-0 
            `}></div>
            {/* テキスト部分 */}
            <div className="
                relative flex flex-col items-center z-20
                mt-4
            ">
                <h3 className="
                    sm:text-[12px] md:text-[16px] md:text-[20px] 
                    font-bold leading-tight mb-4 whitespace-pre-wrap
                ">
                    {item.title}
                </h3>

                {isDetailOpened && <h4>課題</h4>}

                <p className={textCss}>
                    {item.text}
                </p>

                {isDetailOpened && (
                    <>
                        <h4>解決法</h4>
                        <p className={textCss}>{item.solution}</p>
                    </>
                )}
            </div>

            {/* 下部に固定 */}
            <div className=" flex flex-col items-center gap-4 z-20"> {/* relative */}
                <div
                    className="
                        bg-blue-500 text-white text-center py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition
                        absolute bottom-8 z-20
                        sm:w-28 md:w-32 lg:w-24
                        sm:text-[6px] md:text-[8px] lg:text-xs
                    "
                    onClick={() => window.location.href = 'https://example.com'}
                >
                関連する研修を見る
                </div>
                <img
                    src="/images/caret-down.svg"
                    alt="caret down"
                    className="sm:w-[24px] md:w-[32px] lg:w-[24px] absolute bottom-8"
                    style={{
                        transform: `scaleY(${isDetailOpened ? -1 : 1})`
                    }}
                />
            </div>
        </div>
    );
};

export default Circle;