'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Example() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantityPoltava, setQuantityPoltava] = useState('');
    const [quantityHristoBotev, setQuantityHristoBotev] = useState('');

    const [type, setType] = useState("");

    const handleChange = (event:any) => {
        setType(event.target.value);
    }

    async function handleSubmit(e:any) {
        e.preventDefault();
        const supabase = createClient();

        try {
            const { data: productData, error: productError } = await supabase
                .from('products')
                .insert([{
                    name: name,
                    single_price: parseFloat(price),
                    type: type,
                    quantity_poltava: parseInt(quantityPoltava),
                    quantitiy_hristo_botev: parseInt(quantityHristoBotev)
                }])
                .select();

            if (productError) {
                console.error('Insert product error:', productError);
                return;
            }

            const { data: historyData, error: historyError } = await supabase
                .from('history')
                .insert([{
                    type_of_message: 'Adding product',
                    specific_information: name
                }])
                .select();

            if (historyError) {
                console.error('Insert history error:', historyError);
            } else {
                console.log('Product added and history logged successfully:', {
                    productData,
                    historyData
                });

                // Clear form if needed:
                setName('');
                setPrice('');
                setQuantityPoltava('');
                setQuantityHristoBotev('');
                setType('');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    }

    const handleName = (event:any) => {
        setName(event.target.value);
    }
    const handleQuantityHristoBotev = (event:any) => {
        setQuantityHristoBotev(event.target.value);
    }
    const handleQuantityPoltava = (event:any) => {
        setQuantityPoltava(event.target.value);
    }
    const handlePrice = (event:any) => {
        setPrice(event.target.value);
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 mt-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Добавяне на продукт
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Име на продукт
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
                                Категория продукт
                            </label>
                            <div className="mt-2">
                                <select required onChange={handleChange} value={type} className="block w-full rounded-md text-base border-1 text-gray-900 border-gray-300 px-3 py-1.5 bg-white focus:outline-2 focus:-outline-offset-2 outline-gray-300 focus:outline-indigo-600">
                                    <option value="">Моля, изберете категория</option>
                                    <option value="Боя">Боя</option>
                                    <option value="Мазилка">Мазилка</option>
                                    <option value="Грунд">Грунд</option>
                                    <option value="Фасада">Фасада</option>
                                    <option value="Инструменти">Инструменти</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                                Цена (в евро):
                            </label>
                            <div className="mt-2">
                                <input
                                    value={price}
                                    onChange={handlePrice}
                                    id="price"
                                    name="price"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="quantity_hristo_botev" className="block text-sm font-medium text-gray-900">
                                    Количество - Христо Ботев
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={quantityHristoBotev}
                                    onChange={handleQuantityHristoBotev}
                                    id="quantity_hristo_botev"
                                    name="quantity_hristo_botev"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div><div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="quantityPoltava" className="block text-sm font-medium text-gray-900">
                                    Количество - Полтава
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={quantityPoltava}
                                    onChange={handleQuantityPoltava}
                                    id="quantityPoltava"
                                    name="quantityPoltava"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Добавяне на продукт
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
