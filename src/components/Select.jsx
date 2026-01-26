import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

export default function Select({
    value,
    onChange,
    options = [],
    placeholder = 'Select option',
    className = ''
}) {
    const selectedOption = options.find(opt => opt.value === value)

    return (
        <Listbox value={value} onChange={onChange}>
            <div className={`relative ${className}`}>
                <Listbox.Button className="input-field flex items-center justify-between cursor-pointer">
                    <span className={selectedOption ? 'text-white' : 'text-surface-500'}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <ChevronUpDownIcon className="w-5 h-5 text-surface-400" />
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-auto glass rounded-xl py-2 shadow-lg focus:outline-none">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active, selected }) => `
                  relative cursor-pointer select-none py-2.5 px-4 transition-colors
                  ${active ? 'bg-surface-800' : ''}
                  ${selected ? 'text-primary-400' : 'text-surface-300'}
                `}
                            >
                                {({ selected }) => (
                                    <div className="flex items-center justify-between">
                                        <span className={selected ? 'font-medium' : ''}>
                                            {option.label}
                                        </span>
                                        {selected && <CheckIcon className="w-4 h-4 text-primary-400" />}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
