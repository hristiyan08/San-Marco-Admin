'use client'
import Layout_template from "@/app/Layout_template";
import config from "@/app/data/profileConfig.json";
import {useEffect, useState} from "react";
import { getProducts} from "@/app/data/DataInfo";
import { useRef } from 'react';
import PasswordRecoveryHandler from "@/app/profiles/passwordReset";
const productPrompts = config.productPrompts;
const productKeys = config.productKeys;
export default function Products() {
    const [products, setProducts] = useState<any[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        fetchData();
    }, []);

    const OpenMagicLink = (urlAddressToOpen) => {
        const width = 500;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(
            urlAddressToOpen,
            '_blank',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        );
    };


    return (
        <Layout_template title="Продукти">
            <div className="w-full flex justify-end mb-3">
                <select
                    className="bg-gray-900 p-2 text-white rounded-md cursor-pointer hover:bg-gray-800"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'add') {
                            OpenMagicLink('../products/addProduct');
                        } else if (value === 'transfer') {
                            OpenMagicLink('../products/transferProduct');
                        } else if (value === 'stats') {

                        }
                    }}
                >
                    <option value="">Избиране на опция</option>
                    <option value="add">Добавяне на продукт</option>
                    <option value="transfer">Трансфер на продукт</option>
                    <option value="stats">Таблица със статистика</option>
                </select>

            </div>
            <h1 className="text-2xl font-semibold">Таблица с налични продукти</h1>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10" >
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {productPrompts.map((prompt) => (
                            <th key={prompt} className="px-6 py-3 text-gray-200" scope="col">{prompt}</th>
                        ))}

                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                            {productKeys.map((key) => (
                                <td key={key} className="px-6 py-4" scope="row">
                                    <p className="block text-sm text-slate-800">{product[key]}</p>
                                </td>
                            ))}

                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>


        </Layout_template>
    )

}