import OrgSideBar from "@/components/organization/SideBar";
import OrgTopBar from "@/components/organization/TopBar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import calendarIcon from "/public/images/icons/calendar.png";
import calendarSetting from "/public/images/calendar-setting.png";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useLangStore } from "@/utils/code";

export default function Calendar() {
    const { t } = useTranslation('common')
	const srcLang = useLangStore((state: { lang: any }) => state.lang);
    const router = useRouter();
    return(
        <>
            <Head>
				<title>{t('Words.Calendar')}</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main>
				<OrgSideBar />
				<OrgTopBar />
				<div id="overlay" className="fixed left-0 top-0 z-[9] hidden h-full w-full bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.2)]"></div>
				<div className="layoutWrap p-4 lg:p-8">
                    <div className="rounded-normal bg-white shadow-normal dark:bg-gray-800">
						<div className="border-b py-4">
                            <div className="w-full max-w-[1100px] mx-auto flex flex-wrap items-center justify-start py-2 px-4">
                                <button
                                    onClick={() => router.back()}
                                    className="mr-10 justify-self-start text-darkGray dark:text-gray-400"
                                >
                                    <i className="fa-solid fa-arrow-left text-xl"></i>
                                </button>
                                <h2 className="text-lg font-bold flex items-center">
                                    <div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded bg-[#B2E3FF] p-3">
                                        <Image src={calendarIcon} alt='Active Job' height={20} />
                                    </div>
                                    <span>{t('Words.Calendar')}</span>
                                </h2>
                            </div>
						</div>
                        <div className="w-full max-w-[980px] mx-auto px-4 py-6">
                            <div className="bg-gradient-to-br from-[#8F93F8] to-[#8DB9FB] flex flex-wrap rounded-normal overflow-hidden text-white mb-6">
                                <div className="w-full md:max-w-[calc(100%-200px)] flex items-center">
                                    <Image src={calendarSetting} alt="Calendar" width={60} className="ml-4 mb-8" />
                                    <p className="px-4 text-center grow">
                                        {
                                            srcLang === 'ja'
                                            ?
                                            '既存のカレンダーを連携することができます'
                                            :
                                            'Connect your calendar with the provided integration'
                                        }
                                    </p>
                                </div>
                                <div className="w-full md:max-w-[200px] border-l flex items-center justify-center">
                                    <Button label={t('Btn.Integrate')} />
                                </div>
                            </div>
                            <FormField fieldType="select" label={srcLang === 'ja' ? 'タイムゾーン' : 'Time Zone'} />
                            <div className="w-full max-w-[600px] mx-auto">
                                <h6 className="font-semibold mb-2 text-darkGray dark:text-gray-400">
                                {
                                    srcLang === 'ja'
                                    ?
                                    '面接可能な時間帯を設定'
                                    :
                                    'Set your working week days to schedule interviews'
                                }
                                </h6>
                                <div className="">
                                    <table cellPadding={"0"} cellSpacing={"0"} className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '月曜日' : 'Monday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '火曜日' : 'Tuesday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '水曜日' : 'Wednesday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '木曜日' : 'Thursday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '金曜日' : 'Friday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '土曜日' : 'Saturday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 text-sm text-darkGray dark:text-gray-400">
                                                    {srcLang === 'ja' ? '日曜日' : 'Sunday'}
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"start"}
                                                        fieldType="date"
                                                        placeholder={t('Form.StartTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                                <td className="border-b dark:border-b-gray-600 py-2 px-3 w-[150px]">
                                                    <FormField
                                                        id={"end"}
                                                        fieldType="date"
                                                        placeholder={t('Form.EndTime')}
                                                        singleSelect
                                                        showTimeSelect
                                                        showHours
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
					</div>
                </div>
            </main>
        </>
    )
}
export async function getStaticProps({ context, locale }:any) {
	const translations = await serverSideTranslations(locale, ['common']);
	return {
		props: {
		...translations
		},
	};
}
