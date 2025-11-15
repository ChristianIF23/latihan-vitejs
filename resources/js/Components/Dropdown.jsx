/**
 * Dropdown Component System
 * -------------------------
 * Sistem dropdown modular terdiri dari:
 * - Dropdown: Provider utama untuk state dan konteks.
 * - Trigger: Elemen pemicu dropdown.
 * - Content: Isi dropdown yang muncul.
 * - Dropdown.Link: Link khusus dropdown (berbasis Inertia Link).
 *
 * Seluruh logika dan perilaku tetap sama seperti versi asli.
 */

import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

// Context untuk menyimpan state dropdown terbuka atau tidak
const DropDownContext = createContext();

/* ----------------------------------------------------------
 * Dropdown Wrapper (Provider)
 * ---------------------------------------------------------- */
const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

/* ----------------------------------------------------------
 * Dropdown Trigger
 * (Elemen yang diklik untuk membuka/menutup dropdown)
 * ---------------------------------------------------------- */
const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            {/* Trigger utama */}
            <div onClick={toggleOpen}>
                {children}
            </div>

            {/* Background overlay untuk menutup dropdown saat klik di luar */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

/* ----------------------------------------------------------
 * Dropdown Content
 * (Isi dropdown yang muncul)
 * ---------------------------------------------------------- */
const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    // Penentuan alignment
    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    // Penentuan lebar
    let widthClasses = '';
    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

/* ----------------------------------------------------------
 * Dropdown Link
 * (Link dalam dropdown, berbasis Inertia Link)
 * ---------------------------------------------------------- */
const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={`
                block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700
                transition duration-150 ease-in-out
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                ${className}
            `}
        >
            {children}
        </Link>
    );
};

/* ----------------------------------------------------------
 * Attach subcomponents
 * ---------------------------------------------------------- */
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
