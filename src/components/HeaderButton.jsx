import { twMerge } from "tailwind-merge";

export default function HeaderButton({children, className}) {
  return (
  <button className={twMerge('text-sm text-white cursor-pointer px-3.5 py-1.25 rounded-md transition', className)}>
    {children}
  </button>
  )
}