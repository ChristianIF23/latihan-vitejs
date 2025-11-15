import { Link } from '@inertiajs/react'

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        // hilangin border-b-2
        'inline-flex h-12 items-center px-3 text-sm font-medium transition duration-150 ease-in-out ' +
        (active
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-700') +
        ' ' +
        className
      }
    >
      {children}
    </Link>
  )
}
