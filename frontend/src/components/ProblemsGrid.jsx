import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import problemsJson from '../data/problems.json';

const ProblemsGrid = () => {
    const [activeIndex, setActiveIndex] = useState(false);
    const [currentSlidesPerView, setCurrentSlidesPerView] = useState(1);
    const [centerIndex, setCenterIndex] = useState(0);
    const swiperRef = useRef(null);

    const handleSlideChange = (swiper) => {
        // 現在のスライド数を状態に設定
        setCurrentSlidesPerView(swiper.params.slidesPerView);
    };

    const totalHeight = 800;
    const totalPadding = 50;

    return (
        <div
            style = {{
                position: 'relative',
                top: `${totalPadding}px`,
                height: `${totalHeight-totalPadding*2}px`,
                overflow: 'visible'
            }}
        >
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                spaceBetween={40}
                slidesPerView={5}
                breakpoints={{
                    // 画面幅が640px以上の場合
                    0: {
                        slidesPerView: 1,
                    },
                    // 画面幅が1024px以上の場合
                    760: {
                        slidesPerView: 3,
                    },
                    // 画面幅が1440px以上の場合
                    1200: {
                        slidesPerView: 5,
                    },
                }}
                onBreakpoint={(swiper) => handleSlideChange(swiper)}
                loop={true}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                    const currentRealIndex = swiper.realIndex;
                    const slidesPerView = swiper.params.slidesPerView;

                    // 中心のスライドのインデックスを計算
                    const newIndex = currentRealIndex + Math.floor(slidesPerView / 2);
                    setCenterIndex(newIndex % problemsJson.length); // items.lengthはスライドの総数
                }}
                onSwiper={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                    swiperRef.current = swiper;
                }}
                className={`h-[${totalHeight - totalPadding * 2}px] top-[${totalPadding}px]`}
                style={{
                    height: `calc(${totalHeight - totalPadding * 2}px - 100px)`,
                    paddingLeft: '50px',
                    paddingRight: '50px'
                }}
            >
                    {problemsJson.map((item, index) => (
                        <SwiperSlide
                        key={item.id}
                        className="flex items-center justify-center h-full"
                        >
                            <ProblemRect
                                item={item}
                                index={index}
                                activeIndex={activeIndex}
                                onSlideNext={() => swiperRef.current?.slideNext()}
                                onSlidePrev={() => swiperRef.current?.slidePrev()}
                                numSlidesPerView={currentSlidesPerView}
                                centerIndex={centerIndex}
                            ></ProblemRect>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            );
    };

const ProblemRect = ({ item, index, activeIndex, onSlideNext, onSlidePrev, numSlidesPerView, centerIndex }) => {
    const [isDetailOpened, setDetailOpened] = useState(false);
    const handleClick = () => {
        determineSide(index);
    };

    const determineSide = (targetIndex) => {
        const totalSlides = problemsJson.length;
        // 中心からの左右の距離を計算
        const distance = (targetIndex - centerIndex + totalSlides) % totalSlides;

        // ループを考慮して距離を調整
        const halfSlides = Math.floor(totalSlides / 2);

        if (distance === 0) {
            setDetailOpened(!isDetailOpened);
        } else if (distance <= halfSlides) {
            onSlideNext();
        } else {
            onSlidePrev();
        };
    };

    const isCenter = () => {
        return (index === loopIndex());
    };

    const loopIndex = () => {
        return ((activeIndex + (numSlidesPerView - 1) / 2 + problemsJson.length) % problemsJson.length);
    };

    const headerCss = `
        sm:text-[12px] md:text-[16px] md:text-[20px] 
        font-bold leading-tight mb-4 whitespace-pre-wrap
    `;

    const textCss = `
        0:text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px]
        tracking-[0.125em] text-gray-400 w-[80%] mx-auto
    `; // leading-relaxed

    return (
        <div
            key={index}
            className="
                rounded-3xl
                bg-[#E6F6FD] flex flex-col justify-between items-center mx-auto
                w-[200px]
                pt-10 p-2
            "
            // sm:w-3xs md:w-2xs lg:w-xs
            style = {{
                height: isDetailOpened && isCenter() ? "400px" : "300px",
                transform: isCenter() ? 'scale(1.3)' : 'scale(1)'
            }}
            onClick={handleClick}
        >
            <div className="flex flex-col items-center">
                <h3 className={headerCss}>
                    {item.title}
                </h3>

                {isDetailOpened && isCenter() && <h4>課題</h4>}

                <p className={textCss}>
                    {item.text}
                </p>

                {isDetailOpened && isCenter() && (
                    <>
                        <h4>解決法</h4>
                        <p className={textCss}>{item.solution}</p>
                    </>
                )}
            </div>

            {/* 下部に固定 */}
            <div className="flex flex-col items-center gap-4">
                <div
                    className="
                        bg-blue-500 text-white text-center py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition
                        sm:w-28 md:w-32 lg:w-36
                        sm:text-[6px] md:text-[8px] lg:text-xs
                    "
                    onClick={() => window.location.href = 'https://example.com'}
                >
                関連する研修を見る
                </div>
                <img
                    src="/images/caret-down.svg"
                    alt="caret down"
                    className="sm:w-[24px] md:w-[32px] lg:w-[48px]"
                    style={{
                        transform: `scaleY(${isDetailOpened ? -1 : 1})`
                    }}
                />
            </div>
        </div>
    );
};

export default ProblemsGrid;