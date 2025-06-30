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
                            OpenMagicLink('../products/storeProduct');
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </Layout_template>
    );
}
