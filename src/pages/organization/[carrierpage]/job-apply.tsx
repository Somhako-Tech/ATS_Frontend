import Button from "@/components/button";
import FormField from "@/components/formfield";
import HeaderBar from "@/components/HeaderBar";
import { axiosInstanceAuth } from "@/pages/api/axiosApi";
import { useCarrierStore } from "@/utils/code";
import { getProviders, useSession } from "next-auth/react";
import router from "next/router";
import { useState, Fragment, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import toastcomp from "@/components/toast";

export default function ApplyJob() {
    const { data: session } = useSession();
    const cancelButtonRef = useRef(null)
    const [socialPopup, setSocialPopup] = useState(false)
    const [skillsPopup, setSkillsPopup] = useState(false)
    const [eduPopup, setEduPopup] = useState(false)
    const [certPopup, setCertPopup] = useState(false)
    const [expPopup, setExpPopup] = useState(false)

    
    
    const cname = useCarrierStore((state) => state.cname)
    const cid = useCarrierStore((state) => state.cid)
    const jid = useCarrierStore((state) => state.jid)
    const jdata = useCarrierStore((state) => state.jdata)
    const setjdata = useCarrierStore((state) => state.setjdata)

    const [resume,setresume] = useState()
    const [fname,setfname] = useState("")
    const [lname,setlname] = useState("")
    const [email,setemail] = useState("")
    const [phone,setphone] = useState("")
    const [summary,setsummary] = useState("")

    const [token,settoken] = useState("")
    const [done,setdone] = useState(0)

    const axiosInstanceAuth2 = axiosInstanceAuth(token)

    useEffect(()=>{
        if(session){settoken(session['accessToken'])}
    },[session])
    
    useEffect(()=>{
        if(jdata && Object.keys(jdata).length === 0 || jid && jid == "" || !session){
            if(cname=="" && cid=="")
                router.replace(`/organization/${cname}`)
            else
                router.back()
        }
    },[cid,jid,jdata,session,cname])

    function verifyForm() {
        return fname.length > 0 && lname.length > 0 && email.length > 0 && phone.length > 0 && summary.length > 0 && resume
    }

    const [link,setlink] = useState("")
    const [linkarr,setlinkarr] = useState([])

    function verifySocialForm() {
        return link.length > 0
    }

    const [skill, setSkill] = useState([])
    const [stitle, setSTitle] = useState("")
    const [sprf, setSProf] = useState("")
    const [sset, setSSet] = useState("")

    function verifySkillPopup() {
        return stitle.length > 0 && sprf.length > 0 && sset.length > 0 
    }


    const [cert, setCert] = useState([])
    const [certname, setCERTName] = useState("")
    const [corg, setCOrg] = useState("")
    const [cexp, setCExp] = useState(false)
    const [cidate, setCIDate] = useState("")
    const [cedate, setCEDate] = useState("")
    const [certid, setCERTId] = useState("")
    const [curl, setCUrl] = useState("")

    function verifyCertPopup() {
        return certname.length > 0 && corg.length > 0 && cidate.length > 0 && certid.length > 0 && curl.length > 0 && (cexp || cedate.length > 0)
    }

    async function saveresume(){
        const formData = new FormData()
        formData.append("file", resume)
        await axiosInstanceAuth2
            .post(`/candidate/candidateresume/${jdata["refid"]}/`, formData)
            .then(async res => {
                console.log("Resume Saved")

            })
            .catch(err => {
                console.log(err)
            })
    }

    async function saveprofile(){
        const formData = new FormData()
        formData.append("first_name", fname)
        formData.append("last_name", lname)
        formData.append("mobile", phone)
        formData.append("summary", summary)
        await axiosInstanceAuth2
            .post(`/candidate/candidateprofile/${jdata["refid"]}/`, formData)
            .then(async res => {
                createapplicant()
                console.log("profile saved")
                
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function createapplicant(){
        const formData = new FormData()
        await axiosInstanceAuth2
            .post(`/job/applicant/apply/${jdata["refid"]}/`,)
            .then(async res => {
                console.log("Applied")
                toastcomp("Applied Successfully","success")
            })
            .catch(err => {
                console.log(err)
                toastcomp("Applied Not Successfully","error")
            })
    }

    function apply(){
        saveresume()
        saveprofile()
    }

    function show(){
        console.log("Link : ",linkarr)
        console.log("Skill : ",skill)
        console.log("Certificate : ",cert)
    }

    return (
        <>
            <main className="py-8">
                <div className="w-full max-w-[1000px] mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-normal shadow-normal">
                        <div className="rounded-t-normal overflow-hidden">
                            <HeaderBar handleBack={() => router.back()} />
                        </div>
                        <div className="p-8">
                            <div className="py-1">
                                <div className="my-2 border rounded-normal overflow-hidden flex">
                                    <div className="w-[70px] bg-red-600 text-white font-bold text-center p-3">
                                        <p className="uppercase">pdf</p>
                                    </div>
                                    <div className="w-[calc(100%-70px)] py-3 px-6 flex items-center justify-between">
                                        <p className="text-darkGray font-semibold">Product Manager</p>
                                        <aside>
                                            <button type="button" className="text-primary hover:underline">
                                                Choose
                                            </button>
                                            <button type="button" className="text-darkGray hover:text-red-500 ml-10">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </aside>
                                    </div>
                                </div>
                                <div className="my-2 border rounded-normal overflow-hidden flex">
                                    <div className="w-[70px] bg-red-600 text-white font-bold text-center p-3">
                                        <p className="uppercase">pdf</p>
                                    </div>
                                    <div className="w-[calc(100%-70px)] py-3 px-6 flex items-center justify-between">
                                        <p className="text-darkGray font-semibold">Product Manager</p>
                                        <aside>
                                            <button type="button" className="text-primary hover:underline">
                                                Choose
                                            </button>
                                            <button type="button" className="text-darkGray hover:text-red-500 ml-10">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <label htmlFor="uploadCV" className="border rounded-normal p-6 text-center cursor-pointer block mb-6">
                                <h3 className="font-semibold text-xl mb-4">Autofill With Resume</h3>
                                <h5 className="text-darkGray mb-2">Drag and Drop Resume Here</h5>
                                <p className="text-sm mb-2">Or <span className="text-primary font-semibold">Click Here To Upload</span></p>
                                <p className="text-darkGray text-sm">
                                    Maximum File Size: 5 MB
                                </p>
                                <input type="file" className="hidden" id="uploadCV"  onChange={e => setresume(e.target.files[0])} />
                            </label>
                            <div className="flex flex-wrap mx-[-10px]">
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="text" label="First Name" placeholder="First Name" value={fname} handleChange={e => setfname(e.target.value)} />
                                </div>
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="text" label="Last Name" placeholder="Last Name" value={lname} handleChange={e => setlname(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mx-[-10px]">
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="email" label="Email" placeholder="Email" required value={email} handleChange={e => setemail(e.target.value)} />
                                </div>
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="number" label="Phone Number" placeholder="Phone Number" value={phone} handleChange={e => setphone(e.target.value)} />
                                </div>
                            </div>
                            <FormField fieldType="addItem" inputType="text" label="Social Links" placeholder="Add Social Profiles" icon={<i className="fa-regular fa-plus"></i>} readOnly />
                            <div className="border border-slate-300 border-t-0 -mt-5 rounded-b p-4 mb-4">
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px]">
                                        <div className="iconGroup social delete">
                                            <input
                                                type="text"
                                                className="w-full rounded border-lightGray dark:bg-gray-700"
                                                readOnly
                                                value="https://dsad.com"
                                            />
                                            <i className="fa-solid fa-link iconGroup__icon"></i>
                                            <i
                                                className="fa-solid fa-trash iconGroup__icon-delete"
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px]">
                                        <div className="iconGroup social delete">
                                            <input
                                                type="text"
                                                className="w-full rounded border-lightGray dark:bg-gray-700"
                                                readOnly
                                                value="https://dsad.com"
                                            />
                                            <i className="fa-solid fa-link iconGroup__icon"></i>
                                            <i
                                                className="fa-solid fa-trash iconGroup__icon-delete"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormField fieldType="textarea" label="Summary" placeholder="Summary" value={summary} handleChange={e => setsummary(e.target.value)} />
                            <FormField fieldType="addItem" inputType="text" label="Skills" placeholder="Add Skills" icon={<i className="fa-regular fa-plus"></i>} readOnly />
                            <div className="flex flex-wrap items-start border border-slate-300 border-t-0 -mt-5 rounded-b p-4 mb-4">
                                {Array(2).fill(
                                <p
                                    className="relative bg-[#C9B3FF] dark:bg-gray-900 dark:text-white rounded-lg py-2 px-3 flex items-center text-[14px] mr-2 mb-1"
                                >
                                    Php
                                    <span
                                    className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]"
                                    >
                                        <i className="fa-solid fa-star ml-1"></i>
                                        <i className="fa-solid fa-star ml-1"></i>
                                        <i className="fa-solid fa-star ml-1"></i>
                                    </span>
                                    <button
                                    type="button"
                                    className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded"
                                    >
                                    <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </p>
                                )}
                            </div>
                            <FormField fieldType="addItem" inputType="text" label="Education" placeholder="Add Education" icon={<i className="fa-regular fa-plus"></i>} readOnly />
                            <div className="border border-slate-300 border-t-0 -mt-5 rounded-b p-4 mb-4">
                                <div
                                className="w-full rounded-[20px] bg-[#FAF8FF] dark:bg-gray-900 text-black dark:text-white border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                                >
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">
                                            Education Title
                                        </h4>
                                        <p className="text-[#6D27F9] font-medium mb-2">
                                            Education College
                                        </p>
                                        <p className="text-[#333] dark:text-white font-light text-sm mb-2">
                                            Started Date:- 01-02-2020 <br /> End
                                            Date:- 01-02-2021
                                        </p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#333] dark:text-white font-light text-sm">
                                            Education About
                                        </p>
                                    </article>
                                    <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                        <button
                                            type="button"
                                            className="text-red-500 mx-2"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <FormField fieldType="addItem" inputType="text" label="Certification" placeholder="Add Certification" icon={<i className="fa-regular fa-plus"></i>} readOnly />
                            <div className="border border-slate-300 border-t-0 -mt-5 rounded-b p-4 mb-4">
                                <div
                                className="w-full rounded-[20px] bg-[#FAF8FF] dark:bg-gray-900 text-black dark:text-white border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                                >
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">
                                            Certification Title
                                        </h4>
                                        <p className="text-[#6D27F9] font-medium mb-2">
                                            Certification Company
                                        </p>
                                        <p className="text-[#333] dark:text-white font-light text-sm mb-2">
                                            Issued Date:- 01-02-2020 <br /> End
                                            Expiration Date:- 01-02-2021
                                        </p>
                                        <p className="text-[#333] dark:text-white font-light text-sm">
                                            Credential ID
                                        </p>
                                        <a
                                            type="button"
                                            href={'#'}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="my-2 min-w-[60px] rounded py-1 px-2 text-white text-[12px] bg-gradient-to-b from-gradLightBlue to-gradDarkBlue hover:from-gradDarkBlue hover:to-gradDarkBlue disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
                                        >
                                            Show Certificate
                                        </a>
                                    </article>
                                    <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                        <button
                                            type="button"
                                            className="text-red-500 mx-2"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-8 mb-4" />
                            <div className="mb-4 relative">
                                <FormField fieldType="addItem" inputType="text" label="Experience" placeholder="Add Experience" icon={<i className="fa-regular fa-plus"></i>} readOnly />
                                <FormField fieldType="addItem" inputType="text" label="Social Links" placeholder="Add Social Profiles" icon={<i className="fa-regular fa-plus"></i>} clickevent={() => setSocialPopup(true)} />
                                <FormField fieldType="textarea" label="Summary" placeholder="Summary" value={summary} handleChange={e => setsummary(e.target.value)} />
                                <FormField fieldType="addItem" inputType="text" label="Skills" placeholder="Add Skills" icon={<i className="fa-regular fa-plus"></i>} clickevent={() => setSkillsPopup(true)} />
                                <FormField fieldType="addItem" inputType="text" label="Education" placeholder="Add Education" icon={<i className="fa-regular fa-plus"></i>} clickevent={() => setEduPopup(true)} />
                                <FormField fieldType="addItem" inputType="text" label="Certification" placeholder="Add Certification" icon={<i className="fa-regular fa-plus"></i>} clickevent={() => setCertPopup(true)} />
                                <hr className="mt-8 mb-4" />
                                <div className="mb-4 relative">
                                    <FormField fieldType="addItem" inputType="text" label="Experience" placeholder="Add Experience" icon={<i className="fa-regular fa-plus"></i>} clickevent={() => setExpPopup(true)} />
                                    <label htmlFor="newGraduate" className="font-bold text-sm absolute right-0 top-0">
                                        <input type="checkbox" id="newGraduate" name="newGraduate" className="mr-2 mb-[3px]" />
                                        New Graduate
                                    </label>
                                </div>
                            </div>
                            <div className="border border-slate-300 border-t-0 -mt-5 rounded-b p-4 mb-4">
                                <div
                                className="w-full rounded-[20px] bg-[#FAF8FF] dark:bg-gray-900 text-black dark:text-white border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                                >
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">
                                            Experience Title
                                        </h4>
                                        <p className="text-[#6D27F9] font-medium mb-2">
                                            Experience Company
                                        </p>
                                        <p className="text-[#333] dark:text-white font-light text-sm mb-2">
                                            Started Date:- 01-02-2020 <br /> 
                                            End Date:- 01-02-2021
                                        </p>
                                        <p className="text-[#333] dark:text-white font-light text-sm mb-2">
                                            Job Type:- Full Time
                                        </p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#333] dark:text-white font-light text-sm">
                                            Education About
                                        </p>
                                    </article>
                                    <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                        <button
                                            type="button"
                                            className="text-red-500 mx-2"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap mx-[-10px]">
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="text" label="Current Salary" placeholder="Current Salary" />
                                </div>
                                <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                    <FormField fieldType="input" inputType="text" label="Expected Salary" placeholder="Expected Salary" />
                                </div>
                            </div>
                            <FormField fieldType="input" inputType="text" label="Notice Period" placeholder="Notice Period" />
                            <p className="text-darkGray mb-4"><small>Note: You can edit your details manually</small></p>
                            <Button label="Apply" loader={false} disabled={!verifyForm()} btnType="button" handleClick={apply} />
                            <Button label="Show Data" loader={false} btnType="button" handleClick={show} />
                        </div>
                    </div>  
                </div>
            </main>
            <Transition.Root show={socialPopup} as={Fragment}>
                <Dialog
                as="div"
                className="relative z-40"
                initialFocus={cancelButtonRef}
                onClose={setSocialPopup}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] dark:bg-gray-800 text-black dark:text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="flex items-center justify-between text-white bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3">
                                <h4 className="leading-none font-semibold">
                                    Add Social Profile
                                </h4>
                                <button
                                    type="button"
                                    className="leading-none hover:text-gray-700"
                                    onClick={() => setSocialPopup(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="p-8">
                                <FormField fieldType="input" inputType="text" label="Enter Social Profile Url" placeholder="https://facebook.com" value={link} handleChange={(e)=>setlink(e.target.value)} />
                                <div className="text-center">
                                    <Button label="Save" disabled={!verifySocialForm()} btnType="button" handleClick={()=>{
                                        let arr = linkarr
                                        arr.push(link)
                                        setlinkarr(arr)
                                        setlink("")
                                        setSocialPopup(false)
                                    }} />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={skillsPopup} as={Fragment}>
                <Dialog
                as="div"
                className="relative z-40"
                initialFocus={cancelButtonRef}
                onClose={setSocialPopup}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] dark:bg-gray-800 text-black dark:text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="flex items-center justify-between text-white bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3">
                                <h4 className="leading-none font-semibold">
                                    Add Skills
                                </h4>
                                <button
                                    type="button"
                                    className="leading-none hover:text-gray-700"
                                    onClick={() => setSkillsPopup(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="p-8">
                                <FormField fieldType="select" label="Choose desired skill"
                                singleSelect
                                value={stitle}
                                handleChange={(e)=>setSTitle(e.target.value)}
                                options={[
                                    { name: "HTML" },
                                    { name: "PHP" },
                                    { name: "PYTHON" },
                                ]} />
                                <FormField fieldType="select" label="Choose profeciency"
                                singleSelect
                                value={sprf}
                                handleChange={(e)=>setSProf(e.target.value)}
                                options={[
                                    { name: "Beginner" },
                                    { name: "Intermediate" },
                                    { name: "Advance" },
                                ]}
                                />
                                <FormField fieldType="select" label="Set skill primary or secondary" 
                                
                                singleSelect
                                value={sset}
                                handleChange={(e)=>setSSet(e.target.value)}
                                options={[
                                    { name: "Primary" },
                                    { name: "Secondary" }
                                ]}
                                
                                />
                                <div className="text-center">
                                    <Button label="Save"  disabled={!verifySkillPopup()} btnType="button" handleClick={()=>{
                                        let arr = skill
                                        var dict = {
                                            title: stitle,
                                            prof: sprf,
                                            set: sset
                                        }
                                        arr.push(dict)
                                        setSkill(arr)
                                        setSTitle("")
                                        setSProf("")
                                        setSSet("")
                                        setSkillsPopup(false)
                                    }} />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={eduPopup} as={Fragment}>
                <Dialog
                as="div"
                className="relative z-40"
                initialFocus={cancelButtonRef}
                onClose={setEduPopup}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] dark:bg-gray-800 text-black dark:text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="flex items-center justify-between text-white bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3">
                                <h4 className="leading-none font-semibold">
                                    Add Education
                                </h4>
                                <button
                                    type="button"
                                    className="leading-none hover:text-gray-700"
                                    onClick={() => setEduPopup(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Course Name" placeholder="Course Name" />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="University Name" placeholder="University Name" />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="Start Date" placeholder="Start Date" />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="End Date" placeholder="End Date" />
                                    </div>
                                </div>
                                <FormField fieldType="textarea" label="About" />
                                <div className="text-center">
                                    <Button label="Save" />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={certPopup} as={Fragment}>
                <Dialog
                as="div"
                className="relative z-40"
                initialFocus={cancelButtonRef}
                onClose={setCertPopup}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] dark:bg-gray-800 text-black dark:text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="flex items-center justify-between text-white bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3">
                                <h4 className="leading-none font-semibold">
                                    Add Certification
                                </h4>
                                <button
                                    type="button"
                                    className="leading-none hover:text-gray-700"
                                    onClick={() => setCertPopup(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Certificate Name" placeholder="Certificate Name" value={certname} handleChange={e => setCERTName(e.target.value)} />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Issuing Organization" placeholder="Issuing Organization" value={corg} handleChange={e => setCOrg(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="credNotExp" className="font-bold text-sm">
                                        <input type="checkbox" id="credNotExp" name="credNotExp" className="mr-2 mb-[3px]" checked={cexp}
                                        onChange={e => setCExp(e.target.checked)}/>
                                        This credential does not expire.
                                    </label>
                                </div>
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="Issue Date" placeholder="Issue Date" value={cidate}
                                        handleChange={e => setCIDate(e.target.value)} />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="Expiration Date" placeholder="Expiration Date" value={cedate}
                                        handleChange={e => setCEDate(e.target.value)}
                                        disabled={cexp} />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Credential ID" placeholder="Credential ID" value={certid}
                                        handleChange={e => setCERTId(e.target.value)} />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Credential URL" placeholder="Credential URL" value={curl}
                                        handleChange={e => setCUrl(e.target.value)} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button label="Save" disabled={!verifyCertPopup()} btnType="button" handleClick={()=>{
                                        let arr = cert
                                        var dict = {
                                            title: certname,
                                            company: corg,
                                            yearofissue: cidate,
                                            creid: certid,
                                            creurl: curl
                                        }
                                        if (!cexp) {
                                            dict["yearofexp"]=cedate
                                        } else {
                                            dict["yearofexp"]=""
                                        }

                                        arr.push(dict)
                                        setSkill(arr)
                                        setCERTName("")
                                        setCOrg("")
                                        setCIDate("")
                                        setCEDate("")
                                        setCERTId("")
                                        setCUrl("")
                                        setCExp(false)
                                        setCertPopup(false)
                                    }}/>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={expPopup} as={Fragment}>
                <Dialog
                as="div"
                className="relative z-40"
                initialFocus={cancelButtonRef}
                onClose={setExpPopup}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] dark:bg-gray-800 text-black dark:text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="flex items-center justify-between text-white bg-gradient-to-b from-gradLightBlue to-gradDarkBlue px-8 py-3">
                                <h4 className="leading-none font-semibold">
                                    Add Experience
                                </h4>
                                <button
                                    type="button"
                                    className="leading-none hover:text-gray-700"
                                    onClick={() => setExpPopup(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Title" placeholder="Title" />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="text" label="Company Name" placeholder="Company Name" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="currentlyWorking" className="font-bold text-sm">
                                        <input type="checkbox" id="currentlyWorking" name="currentlyWorking" className="mr-2 mb-[3px]" />
                                        Currently Working?
                                    </label>
                                </div>
                                <FormField fieldType="select" label="Job Type" />
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="Start Date" placeholder="Start Date" />
                                    </div>
                                    <div className="w-full md:max-w-[50%] px-[10px] mb-[20px]">
                                        <FormField fieldType="input" inputType="date" label="End Date" placeholder="End Date" />
                                    </div>
                                </div>
                                <FormField fieldType="textarea" label="About" />
                                <div className="text-center">
                                    <Button label="Save" />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
export async function getServerSideProps(context: any) {
	const providers = await getProviders();
	return {
		props: {
			providers
		}
	};
}