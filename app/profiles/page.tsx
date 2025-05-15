'use client'
import Layout_themplate from "@/app/Layout_themplate";
import config from "../data/profileConfig.json";
import getProfiles from './action';
import { useEffect, useState } from 'react';
import PasswordRecoveryHandler from './passwordReset';
const profilePrompts = config.profilePrompts;
const profileKeys = config.profileKeys;
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
export default function Example() {
    const [profiles, setProfiles] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProfiles();
            setProfiles(data);
        };

        fetchData();
    }, []);

    return (
        <Layout_themplate title="Акаунти">
            <div className="w-full flex justify-end mb-3">
                <button className="bg-gray-900 p-2 text-white rounded-md cursor-pointer hover:bg-gray-800" onClick={()=> window.open('/addAccount', '_blank', 'width=500,height=700')}>
                    Добавяне на служител
                </button>
            </div>

            <div className="w-full">
                <h3 className="text-lg font-semibold ml-3 text-slate-800">Свързани акаунти</h3>
                <p className="text-slate-500 mb-5 ml-3">От тук може да контролирате, добавяте, редактирате и премахвате служебните акаунти.</p>
            </div>

            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        {profilePrompts.map((item) => (
                            <th key={item} className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    {item}
                                </p>
                            </th>
                        ))}

                    </tr>
                    </thead>

                    <tbody>
                    {profiles.map((profile, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                            {profileKeys.map((key) => (
                                <td key={key} className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">{profile[key]}</p>
                                </td>
                            ))}
                            <td className="p-4 border-b border-slate-200">
                                <button className="bg-gray-900 text-white p-2 rounded-md cursor-pointer hover:bg-gray-800"
                                        onClick={() => PasswordRecoveryHandler(profile)}
                                >
                                    Смяна на парола
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br />
        </Layout_themplate>
    );
}
