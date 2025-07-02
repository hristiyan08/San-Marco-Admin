'use client';
import Layout_template from "@/app/Layout_template";
import { useEffect, useState } from "react";
import { getHistory } from "@/app/data/DataInfo";

export default function History() {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            const data = await getHistory();
            // @ts-ignore
            setHistory(data);
        }
        fetchData();
    }, []);

    if (!history || history.length === 0) {
        return <p>Зареждане...</p>;
    }

    // Пагинирани записи
    const totalPages = Math.ceil(history.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedHistory = history.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout_template title="История">
            <h1 className="text-2xl font-semibold">Таблица с история</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-900">
                    <tr>
                        <th className="px-6 py-3 text-gray-200">Съобщение</th>
                        <th className="px-6 py-3 text-gray-200">Дата</th>
                    </tr>
                    </thead>
                    <tbody className="text-black">
                    {paginatedHistory.map((entry, index) => {
                        let message = "";
                        let productDetails;
                        function productInformation(){
                            // @ts-ignore
                            const parts = entry.specific_information.split(",");
                            const productId = parts[1]?.trim();
                            const productLocation = parts[0]?.trim();
                            const productQuantity = parts[2]?.trim();
                            productDetails = [productId, productLocation, productQuantity];
                            return productDetails;
                        }

                        // @ts-ignore
                        if (entry.type_of_message === 'Adding product') {
                            // @ts-ignore
                            message = `Добавен е продукт "${entry.specific_information}"`;
                            // @ts-ignore
                        } else if (entry.type_of_message === 'Transfering Product') {
                            const data = productInformation();
                            message = `Продукт с ID ${data[0]} е трансфериран на ${data[1]} с количество ${data[2]}`;
                        }
                        // @ts-ignore
                        else if (entry.type_of_message === 'Adding quantity of product') {
                            const data = productInformation();
                            message = `Продукт с ID ${data[0]} е добавен като стока на ${data[1]} с количество ${data[2]}`;
                        }

                        // @ts-ignore
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4">{message}</td>

                                <td className="px-6 py-4">{entry.created_at?.substring(0, 10)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Пагинация */}
            <div className="flex justify-center items-center gap-4 mb-10">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Назад
                </button>

                <span>Страница {currentPage} от {totalPages}</span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Напред
                </button>
            </div>
        </Layout_template>
    );
}
