import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type ComboBoxWrapperProps = {
    value: string | number;
    onChange: any;
    onBlur: any;
    label: string;
    options: {
        value: string | number;
        label: string;
    }[];
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const ComboBoxWrapper: React.FC<ComboBoxWrapperProps> = ({
    value = '',
    onChange,
    onBlur,
    options,
    error
}) => {
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                return option.label.toLowerCase().includes(query.toLowerCase());
            });

    const getNameFromValue = (value: string | number) => {
        const option = options.find((option) => option.value === value);
        return option ? option.label : "";
    };

    return (
        <>
            <Combobox value={value} onChange={onChange} nullable>
                {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 mt-6">
                    {label}
                </Combobox.Label> */}
                <div className="relative">
                    <div className={`relative w-full border border-gray-300 cursor-default overflow-hidden rounded-xl bg-base text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  ${error ? 'border-red-500' : ''}`}>
                        <Combobox.Button className="w-full inset-y-0 right-0 flex items-center pr-2">
                            <Combobox.Input
                                className={`w-full bg-base h-12 border-none py-2 pl-2 pr-10 text-sm leading-5 text-white focus:ring-0 focus:outline-none `}
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={(optionValue: string | number) =>
                                    getNameFromValue(optionValue)
                                }
                                placeholder="-- Pilih --"
                                onBlur={onBlur}
                            />
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-white shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.value}
                                        className={({ active }) =>
                                            `relative cursor-default py-2 pl-10 pr-4 ${active ? "bg-secondary-light text-white cursor-pointer" : "text-white"
                                            }`
                                        }
                                        value={option.value}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-white"
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </>
    );
}

export default ComboBoxWrapper;