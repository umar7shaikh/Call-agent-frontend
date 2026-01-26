import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
}

export default function Drawer({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'lg',
    footer
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className={`pointer-events-auto w-screen ${sizes[size]}`}>
                                    <div className="flex h-full flex-col bg-surface-900 border-l border-surface-700/50 shadow-2xl">
                                        {/* Header */}
                                        <div className="flex items-start justify-between p-6 border-b border-surface-700/50">
                                            <div>
                                                {title && (
                                                    <Dialog.Title className="text-xl font-semibold text-white">
                                                        {title}
                                                    </Dialog.Title>
                                                )}
                                                {description && (
                                                    <Dialog.Description className="mt-1 text-sm text-surface-400">
                                                        {description}
                                                    </Dialog.Description>
                                                )}
                                            </div>
                                            <button
                                                onClick={onClose}
                                                className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 overflow-y-auto p-6">
                                            {children}
                                        </div>

                                        {/* Footer */}
                                        {footer && (
                                            <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-700/50">
                                                {footer}
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
