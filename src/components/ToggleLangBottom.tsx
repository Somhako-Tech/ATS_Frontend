import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLangStore } from "@/utils/code";

const languages = [
  { name: "en", locale: "en" },
  { name: "ja", locale: "ja" }
];

export default function ToggleLangBottom() {
  const [selectedLanguages, setLanguages] = useState(languages[0]);
  const router = useRouter();
  const lang = useLangStore((state) => state.lang);
  const setlang = useLangStore((state) => state.setlang);

  useEffect(() => {
    setlang(router.locale);
  }, [router]);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="relative">
      <Listbox value={selectedLanguages} onChange={setLanguages}>
        <div className="relative">
          <Listbox.Button className="flex w-[50px] items-center text-sm text-darkGray dark:text-gray-400">
            <span className="leading-1 mr-2 block truncate uppercase">{lang}</span>
            <i className="fa-solid fa-angle-up"></i>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute bottom-full left-0 z-[20] mt-2 max-h-60 w-[150px] overflow-auto rounded-md bg-gradDarkBlue py-1 shadow-normal ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map((item, itemIdx) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative block cursor-pointer select-none py-2 pl-10 pr-4 text-left hover:bg-secondary hover:text-white ${
                      active ? "bg-secondary text-white" : "text-white"
                    }`
                  }
                  value={item}
                  key={itemIdx}
                  as={Link}
                  href={router.asPath}
                  locale={item.locale}
                >
                  <span
                    className={`block truncate uppercase ${
                      lang === item.name ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.name}
                  </span>
                  {lang === item.name ? (
                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}>
                      <i className="fa-solid fa-check"></i>
                    </span>
                  ) : null}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}