'use client'
import Layout_themplate from "@/app/Layout_themplate";
export default function Orders() {
    return (
        <Layout_themplate title="Продукти" location="Христо Ботев 64">
            <div className="w-full flex justify-end mb-3">
                <button className="bg-gray-900 p-2 text-white rounded-md cursor-pointer hover:bg-gray-800" onClick={()=> window.open('/addAccount', '_blank', 'width=500,height=700')}>
                    Добавяне на нов продукт
                </button>

            </div>

        </Layout_themplate>
    )
}