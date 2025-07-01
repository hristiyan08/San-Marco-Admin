'use client'

import { useEffect, useState } from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    ArchiveBoxIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline'
import { getCurrentProfileInformation } from '../app/data/DataInfo'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
    { name: 'Начало', href: '..' },
    { name: 'Продажби', href: 'orders' },
    { name: 'Продукти', href: 'products' },
    { name: 'Акаунти', href: 'profiles' },
]

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '../signout' },
]

function classNames(...classes: (string | boolean | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}
export default function Layout_template({ children, title }: LayoutProps) {
    const [location, setLocation] = useState('')

    useEffect(() => {
        async function fetchData() {
            const data = await getCurrentProfileInformation()
            setLocation(data.location || '')
        }
        fetchData()
    }, [])

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between pt-2">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <h1 className="text-white text-3xl font-bold cursor-pointer" onClick={() => window.location.href = '..'}>San Marco VT</h1>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-60 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                'text-gray-300 hover:bg-gray-800 hover:text-white',
                                                'rounded-md px-3 py-2 text-md font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    onClick={() => window.location.href = '/history'}
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <BellIcon className="size-6" aria-hidden="true" />
                                </button>

                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <img className="size-8 rounded-full" src={user.imageUrl} alt="" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 ring-black/5 shadow-lg">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                                <Bars3Icon className="block size-6" aria-hidden="true" />
                                <XMarkIcon className="hidden size-6" aria-hidden="true" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5">
                            <img className="size-10 rounded-full" src={user.imageUrl} alt="" />
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{user.name}</div>
                                <div className="text-sm font-medium text-gray-400">{user.email}</div>
                            </div>
                            <button
                                type="button"
                                onClick={() => window.location.href = '/history'}
                                className="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                            >
                                <BellIcon className="size-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex row justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                    <h1 className="text-2xl tracking-tight text-gray-900">{location}</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Newsletter Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-4xl font-bold tracking-tight text-white ">San Marco VT</h2>
                            <p className="mt-4 text-lg text-gray-300">
                                Админ система за направа на стокови разписки и фактури, управление на складова програма.
                            </p>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <DocumentTextIcon className="size-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 text-base font-semibold text-white">Стокова разпизка</dt>
                                <dd className="mt-2 text-base text-gray-400">
                                    За да направите стокова разписка отивате на дадения раздел и избирате "Добавяне на нова".
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <ArchiveBoxIcon className="size-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 text-base font-semibold text-white">Складова програма</dt>
                                <dd className="mt-2 text-base text-gray-400">
                                    Можете да добавяте нови продукти и да ги редактирате от дадения раздел. Цените също се редактират от там.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                    <div
                        className="aspect-1155/678 w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <h1 className="text-white text-center mt-10">Made by Hristiyan Yordanov</h1>
            </div>
        </div>
    )
}
