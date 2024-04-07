import { ListWithCards } from "@/type";
import { ListForm } from "./list-form";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
};

export const ListContainer = (({
    data,
    boardId,
}: ListContainerProps) => {
    return (
        <>
            <ListForm />
            <div className="flex-shrink-0 w-1" />
        </>
    )
});