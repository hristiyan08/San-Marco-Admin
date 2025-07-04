'use client'
import Layout_template from "@/app/Layout_template";
import config from "@/app/data/profileConfig.json";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/data/DataInfo";

const productPrompts = config.productPrompts;
const productKeys = config.productKeys;

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchData();
    }, []);

    const OpenMagicLink = (urlAddressToOpen: string) => {
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

    // 🔍 Filtered and paginated products
    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())  ||
         product.id?.toString().includes(searchQuery)
    );


    const sortedProducts = filteredProducts.slice().sort((a, b) => a.id - b.id);



    return (
        <Layout_template title="Продукти">
            <div className="flex justify-between mb-3 flex-wrap ">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Търсене по име..."
                    className="bg-gray-100 p-2 rounded-md border border-gray-300 w-1/2"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />

                {/* Dropdown */}
                <select
                    className="bg-gray-900 p-2 text-white rounded-md cursor-pointer hover:bg-gray-800"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'add') {
                            OpenMagicLink('../products/addProduct');
                        } else if (value === 'transfer') {
                            OpenMagicLink('../products/transferProduct');
                        }
                        else if (value === 'addToStore') {
                            OpenMagicLink('../products/addingProductQuantity');
                        }
                    }}
                >
                    <option value="">Избиране на опция</option>
                    <option value="add">Добавяне на продукт</option>
                    <option value="transfer">Трансфер на продукт</option>
                    <option value="addToStore">Добавяне на стока</option>
                </select>
            </div>

            <h1 className="text-2xl font-semibold">Таблица с налични продукти</h1>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-900">
                    <tr>
                        {productPrompts.map((prompt) => (
                            <th key={prompt} className="px-6 py-3 text-gray-200">{prompt}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {sortedProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                            {productKeys.map((key) => (
                                <td key={key} className="px-6 py-4">
                                    <p className="block text-sm text-slate-800">{product[key]}</p>
                                </td>

                            ))}
                            <td className="px-6 py-4 flex flex-row gap-5">
                                <p className="block text-sm text-slate-800 cursor-pointer hover:text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="size-5 ">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </p>
                                <p className="block text-sm text-slate-800 cursor-pointer hover:text-orange-500 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </Layout_template>
    );
}
