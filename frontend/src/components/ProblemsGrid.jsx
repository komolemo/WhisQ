import react, {useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProblemsGrid = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const GetProblems = (value) => {
        const items = [
            {"id": 1, "title": "タイトル1", "text": "テキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてください"},
            {"id": 2, "title": "タイトル2", "text": "テキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてください"},
            {"id": 3, "title": "タイトル3", "text": "テキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてください"},
            {"id": 4, "title": "タイトル4", "text": "テキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてくださいテキストを入れてください"},
        ];
        if (value > items.length) {
            return [...items, ...items];
        }
        return items;
    };

    const numSlides = 3;
    const numProblems = GetProblems(numSlides).length;

    const paramtersSwiper = () => {
        return {
            modules: [Navigation, Pagination],
            spaceBetween: 20,
            slidesPerView: numSlides,  // numSlidesなど変数にすることも可能
            navigation: true,
            pagination: { clickable: true },
            loop: true,
            onSlideChange: (swiper) => {
                setActiveIndex(swiper.realIndex);
            },
            onSwiper: (swiper) => {
                setActiveIndex(swiper.realIndex);
            }
            };
    };

    const diameter = 200;
    const circle = (index) => {
        const isCente = (activeIndex === ((index + numProblems - 1) % numProblems));
        return {
            style: {
                width: `${diameter}px`,           /* 直径 = 半径 x 2 */
                height: `${diameter}px`,
                borderRadius: "50%",
                background: "grey",
                transform: isCente ? "scale(1.3)" : "scale(1)",
            },
            className: 'slide-content',
            onclick: circleHandle
        };
    };

    const problem = (item) => {
        return (
            <>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            </>
        );
    };

    const circleHandle = () => {
        
    }

    return (
        <Swiper
            {...paramtersSwiper()}
        >
            {GetProblems(numSlides).map((item, index) => (
                <SwiperSlide key={item.id}>
                    <div {...circle(index)}>{problem(item)}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default ProblemsGrid;