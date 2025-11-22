import { PiTrashSimpleLight } from "react-icons/pi";
import type { Course } from "../types/types";


// Pick only string[] fields from Course
type CourseArrayFields = {
    [K in keyof Course]: Course[K] extends string[] | undefined ? K : never;
}[keyof Course];

interface DynamicInputListProps<T extends CourseArrayFields> {
    items: string[];
    field: T;
    placeholder: string;
    addItem: (field: T, value: string) => void;
    updateItem: (field: T, index: number, value: string) => void;
    removeItem: (field: T, index: number) => void;
    inputStyle: string;
    addButton: string;
}

export function DynamicInputList<T extends CourseArrayFields>({
    items,
    field,
    placeholder,
    addItem,
    updateItem,
    removeItem,
    inputStyle,
    addButton,
}: DynamicInputListProps<T>) {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => updateItem(field, index, e.target.value)}
                        placeholder={placeholder}
                        className={inputStyle}
                    />

                    <button
                        type="button"
                        onClick={() => removeItem(field, index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-smooth cursor-pointer"
                    >
                        <PiTrashSimpleLight className="w-5 h-5" />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => addItem(field, "")}
                className={addButton}
            >
                + Add
            </button>
        </div>
    );
}
