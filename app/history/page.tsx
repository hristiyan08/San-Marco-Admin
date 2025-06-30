'use client'
import Layout_template from "@/app/Layout_template";
import config from "@/app/data/profileConfig.json";
import {useEffect, useState} from "react";
import { getHistory } from "@/app/data/DataInfo";

export default function History() {
    const [history, setHistory] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getHistory(); // ако е async
            setHistory(data);
        }

        fetchData();
    }, []);

    if (!history) {
        return <p>Зареждане...</p>; // показва се докато се зарежда историята
    }

    return (
        <Layout_template title="Продукти">
            <h1 className="text-2xl font-semibold">Таблица с история</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-900">
                    <tr>
                        <th className="px-6 py-3 text-gray-200">Съобщение</th>
                        <th className="px-6 py-3 text-gray-200">Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((entry, index) => (
                        entry.type_of_message === 'Adding product' ? ( // твоята проверка
                            <tr key={index} className="">
                                <td className="px-6 py-4  ">
                                    Добавен е продукт "{entry.specific_information}"
                                </td>
                                <td className="px-6 py-4">
                                    {entry.created_at.substring(0, 10)}
                                </td>
                            </tr>
                        ) : (
                            <tr key={index}>
                                <td className="px-6 py-4">{entry.name}</td>
                                <td className="px-6 py-4">{entry.created_at}</td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout_template>
    );
}
