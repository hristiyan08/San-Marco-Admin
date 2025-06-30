'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Example() {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');

    const [location, setLocation] = useState("");

    const handleChange = (event) => {
        setLocation(event.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const supabase = createClient();

        try {
            const productIdInt = parseInt(productId);
            const quantityInt = parseInt(quantity);

            // Вземаме текущите количества
            const { data: dataHristoBotev, error: errorHristoBotev } = await supabase
                .from('products')
                .select('quantitiy_hristo_botev')
                .eq('id', productIdInt)
                .single();

            const { data: dataPoltava, error: errorPoltava } = await supabase
                .from('products')
                .select('quantity_poltava')
                .eq('id', productIdInt)
                .single();

            if (errorHristoBotev || errorPoltava) {
                console.error('Грешка при вземане на данни:', errorHristoBotev || errorPoltava);
                return;
            }

            let newQuantityPoltava;
            let newQuantityHristoBotev;

            if (location === 'Полтава 3Б') {
                newQuantityPoltava = parseInt(dataPoltava.quantity_poltava) + quantityInt;
                newQuantityHristoBotev = parseInt(dataHristoBotev.quantitiy_hristo_botev) - quantityInt;
            } else {
                newQuantityPoltava = parseInt(dataPoltava.quantity_poltava) - quantityInt;
                newQuantityHristoBotev = parseInt(dataHristoBotev.quantitiy_hristo_botev) + quantityInt;
            }

            const { error: updateError } = await supabase
                .from('products')
                .update({
                    quantity_poltava: newQuantityPoltava,
                    quantitiy_hristo_botev: newQuantityHristoBotev
                })
                .eq('id', productIdInt);

            if (updateError) {
                console.error('Грешка при обновяване на количествата:', updateError);
            } else {
                console.log('Успешен трансфер!');
            }

        } catch (err) {
            console.error('Грешка при обработка на трансфер:', err);
        }
    }
    async function handleSubmitMessage(e) {
        e.preventDefault();
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('history')
                .insert([
                    {
                        type_of_message: 'Transfering Product',
                        specific_information: `${location}, ${productId}`,
                    },
                ])
                .select();

            if (error) {
                console.error("Insert to history failed:", error.message);
            } else {
                console.log("Inserted in history:", data);
            }



        }


        catch (err) {
            console.error('Adding product error:', err);
        }
    }

    const  handleId = (event) => {
        setProductId(event.target.value);
    }

    const  handleQuantity = (event) => {
        setQuantity(event.target.value);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 mt-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Трансфер на продукт
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6"  onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmitMessage(e);
                        await handleSubmit(e);
                    }}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                    Номер на продукт (ID)
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleId}
                                        value={productId}
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
                                Местоположение за трансфер (към кой магазин)
                            </label>
                            <div className="mt-2">
                                <select required onChange={handleChange} value={location} className="block w-full rounded-md text-base border-1 text-gray-900 border-gray-300 px-3 py-1.5 bg-white focus:outline-2 focus:-outline-offset-2 outline-gray-300 focus:outline-indigo-600">
                                    <option value="">Моля, изберете местоположение за трансфер</option>
                                    <option value="Полтава 3Б">Полатава 3Б</option>
                                    <option value="Христо Ботев 64">Христо Ботев 64</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                                Преносно количество
                            </label>
                            <div className="mt-2">
                                <input
                                    value={quantity}
                                    onChange={handleQuantity}
                                    id="price"
                                    name="price"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                    </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Трансфер на продукт
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
