'use client'
export default function Example() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-xl">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Профилът е създаден успешно!
                        </h1>                        <br/>
                        <p className="mt-4 text-xl text-gray-500">
                            За да бъде профилът активен, моля влезте в имейла Ви и отворете линка за потвърждаване.

                        </p>

                        <br/>
                            <a
                                onClick={()=> window.close()}
                                className="cursor-pointer inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                            >
                                Затваряне на страницата
                            </a>
                        </div>




                </div>
            </div>
        </div>
    )
}
