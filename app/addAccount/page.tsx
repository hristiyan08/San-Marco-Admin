'use client'
import { signup } from "@/app/login/actions";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Example() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [location, setLocation] = useState("");

    const handleChange = (event:any) => {
        setLocation(event.target.value);
    }

    async function handleSubmit(e:any) {
        e.preventDefault();
        const supabase = createClient();
        try {
             // assuming signup is async

            const { data, error } = await supabase
                .from('profiles')
                .insert([{
                    name: name,
                    email: email,
                    location: location
                }])
                .select(); // optional: only if you want to fetch inserted rows

            if (error) {
                console.error('Insert error:', error);
            } else {
                console.log('Inserted data:', data);
            }
            await signup(email, password);
        } catch (err) {
            console.error('Signup or DB error:', err);
        }
    }

    const handleName = (event:any) => {
        setName(event.target.value);
    }
    const handlePassword = (event:any) => {
        setPassword(event.target.value);
    }
    const handleEmail = (event:any) => {
        setEmail(event.target.value);
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 mt-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Добавяне на служител
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Име на служител
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleName}
                                    value={name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                                Местоположение
                            </label>
                            <div className="mt-2">
                                <select required onChange={handleChange} value={location} className="block w-full rounded-md text-base border-1 text-gray-900 border-gray-300 px-3 py-1.5 bg-white focus:outline-2 focus:-outline-offset-2 outline-gray-300 focus:outline-indigo-600">
                                    <option value="">Моля, изберете магазин</option>
                                    <option value="Полтава 3Б">Полтава 3Б</option>
                                    <option value="Христо Ботев 64">Христо Ботев 64</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Имейл адрес
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={handleEmail}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Парола
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={handlePassword}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Вход
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
