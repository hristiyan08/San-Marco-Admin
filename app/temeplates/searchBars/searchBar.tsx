
// @ts-ignore
import {useState} from "react";
//@ts-ignore
type LayoutProps = {
    tableInfoName:S
}
export default function searchBar({tableInfoName}: LayoutProps){
    const [searchQuery, setSearchQuery] = useState('');
    // 🔍 Filtered and paginated products
    const filteredProducts = tableInfoName.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())  ||
        product.id?.toString().includes(searchQuery)
    );

    return(
        <>
            <input
                type="text"
                placeholder="Търсене по име..."
                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-1/2"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
        </>
    )
}