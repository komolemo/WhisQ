import React, { useState } from "react";
import FAQchat from '../components/FAQchat';

const FAQchatPage = () => {
    return (
        <div className="flex flex-col items-center py-18 overflow-y-scroll h-[2000px]">
            <div className="py-8 w-[512px]">
                <h2 className="text-[36px] font-noto">FAQチャット</h2>
                <p className="font-noto">お問い合わせの前によくある質問をお探しください</p>
            </div>
            <FAQchat/>
        </div>
    );
};

export default FAQchatPage;