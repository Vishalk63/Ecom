import * as React from "react"
import { useDispatch } from "react-redux"
import { sortedProducts } from "@/redux/slices/productSlice"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function SortDropdown() {
    const dispatch = useDispatch()

    const handleSort = (field, order) => {
        dispatch(sortedProducts({ sortField: field, sortOrder: order }))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort By Price</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>PRICE</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuCheckboxItem
                    onCheckedChange={() => handleSort("price", "asc")}
                >
                    Low to High
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                    onCheckedChange={() => handleSort("price", "desc")}
                >
                    High to Low
                </DropdownMenuCheckboxItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortDropdown