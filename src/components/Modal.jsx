import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
}

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showClose = true
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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`
                w-full ${sizes[size]}
                glass rounded-2xl p-6
                transform transition-all
                animate-slide-up
              `}>
                                {/* Header */}
                                {(title || showClose) && (
                                    <div className="flex items-start justify-between mb-6">
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
                                        {showClose && (
                                            <button
                                                onClick={onClose}
                                                className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
