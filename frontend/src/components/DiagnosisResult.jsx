import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react'; 
import { FiArrowUpRight as ArrowUpRight } from 'react-icons/fi';

/**
 * Props:
 * - category: string
 * - issue: string
 * - description: string
 * - match: number
 * - topService: { id, title, description, period, price, image_url, image, tags: [...], url }
 */

const DiagnosisResult = ({category, issue, description, match, topService}) => {
    console.log('[DiagnosisResult] topService keys:', Object.keys(topService));
    console.log('[DiagnosisResult] topService:', topService);

    // 画像パス組み立て
    const imgField = topService.image ?? topService.image_url ?? '';
    const imgSrc = imgField.startsWith('http')
        ? imgField
        : `/images/lectures/${imgField}`;

    const radius = 60;
    const strokeWidth = 10;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (match / 100) * circumference;

    const rawDesc = topService.description || "";
    const delimIndex = rawDesc.search(/[。\u3000 ]/);
    const truncatedDesc =
        delimIndex >= 0 ? rawDesc.slice(0, delimIndex + 1) : rawDesc;

    const cleanTags = (topService.tags || [])
        .slice(0, 2)
        .map(t => t.name.replace(/#/g, ""));

    const priceDisplay =
        isNaN(topService.price) || topService.price <= 5000
            ? 'お問い合わせください'
            : `${topService.price.toLocaleString()}円`;

    // サービス適合度
    const MatchingPercent = () => {
        return (
            <svg height={radius * 2} width={radius * 2} className="mx-auto">
                <circle
                    stroke="#E5E7EB"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                <circle
                    stroke="#1C6CB3"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-2xl font-bold fill-primary"
                >
                    {match}%
                </text>
            </svg>
        );
    };

    // "3ステップで効果を予測"
    const LinkSimulator = ({text}) => {
        return (
            <Link
                to="/kpi"
                className="block w-full bg-primary text-white py-5 rounded-lg
                hover:opacity-90"
            >
                {text}
            </Link>
        );
    };

    // "お問い合わせはこちら"
    const LinkContact = ({text}) => {
        return (
            <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full
                bg-gray-100 text-priary hover:bg-opacity-90
                py-5 rounded-lg font-bold hover:opacity-90 transition"
            >
                {text}
                <ChevronDown size={20} className="ml-2" />
            </Link>
        );
    };

    // おすすめの研修サービス
    const CouseRecommended = () => {
        const CourseDesc = ({label, content}) => {
            return (
                <div className="flex-1 text-center">
                    <span className="inline-block bg-indigo-100 text-primary font-semibold text-xs px-2 py-1 rounded">
                        {{label}}
                    </span>
                    <p className="mt-1 text-sm text-gray-700">
                        {{content}}
                    </p>
                </div>
            );
        };

        const CourceImage = () => {
            return (
                <div className="h-40 w-full overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={topService.title}
                        className="w-full h-full object-cover"
                        onLoad={e => console.log('[DiagnosisResult] img loaded:', e.target.src)}
                        onError={e => console.error('[DiagnosisResult] img error:', e.target.src)}
                    />
                </div>
            );
        };

        const LinkService = () => {
            return (
                <div className="mt-2 flex justify-center">
                    <a
                        href={topService.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto p-5 rounded-full hover:bg-gray-100
                        transition-colors group"
                    >
                        <ArrowUpRight
                            size={34}
                            className="text-gray-600 group-hover:text-gray-800"
                        />
                    </a>
                </div>
            );
        };

        return (
            <div className="w-full md:w-2/5 flex flex-col">
                <h3 className="text-center text-lg font-bold mb-2">おすすめの研修サービス</h3>
                <div className="bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden flex flex-col h-full">
                    {/* サービス画像部 */}
                    <CourceImage/>
                    {/* サービステキスト説明部 */}
                    <div className="p-5 flex flex-col flex-1">
                        {/* サービス名 */}
                        <h4 className="text-center font-bold text-primary mb-2 line-clamp-2">
                            {topService.title}
                        </h4>
                        {/* サービス説明 */}
                        <p className="text-gray-600 text-sm mb-6 flex-1">
                            {truncatedDesc}
                        </p>
                        {/* サービスデータ */}
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <CourseDesc label={"課題"} content={cleanTags.join(' / ')} />
                                <CourseDesc label={"期間"} content={topService.period} />
                                <CourseDesc label={"価格"} content={priceDisplay} />
                            </div>
                        </div>
                        {/* サービスリンク */}
                        <LinkService />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-hidden font-noto">
            <p className="text-gray-500 mb-2">あなたの結果は…</p>
            <h2 className="text-2xl font-bold mb-6">診断結果：{issue}</h2>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-3/5 flex flex-col gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">診断された課題</h3>
                        <p className="text-gray-700">{description}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <h3 className="text-lg font-semibold mb-3">サービス適合度</h3>
                        <MatchingPercent/>

                        {/* ボタン位置を下げてマージントップを増加 */}
                        <div className="mt-8 flex flex-col gap-4">
                            <LinkSimulator text={"3ステップで効果を予測"} />
 
                            {/* お問い合わせボタン */}
                            <LinkContact text={"お問い合わせはこちら"}/>
                        </div>
                    </div>
                </div>
                {/* おすすめサービス */}
                <CouseRecommended/>
            </div>
        </div>
    );  
};

export default DiagnosisResult;
