export default function ApplicationLogo({ className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        O
      </div>
    </div>
  )
}
