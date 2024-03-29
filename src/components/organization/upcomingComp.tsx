import React from "react";
import Image from "next/image";
import comingImg from "/public/images/coming-soon-icon.png";
import { useLangStore } from "@/utils/code";

export default function UpcomingComp({ title,setComingSoon }: any) {
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
	return (
		<div className="mx-auto w-full max-w-[450px] rounded-normal bg-[rgba(255,255,255,0)] p-6 text-center text-white transition hover:scale-[1.05]">
			<Image src={comingImg} alt="Coming Soon" width={100} height={100} className="mx-auto mb-6 w-auto" />
			<h3 className="textGrad mb-4 text-3xl font-extrabold">
				{title && title.length > 0 && <>{title}&nbsp;</>} {srcLang==='ja' ? '準備中' : 'Coming Soon'}
			</h3>
			<p className="text-sm text-darkGray">{srcLang==='ja' ? 'もうまもなくリリース予定' : 'We are working on this and it will ready for you soon.'}</p>
		</div>
	);
}
