"use client"
import { getRoutes } from "@/actions/get-routes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = getRoutes(pathname, params)

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(({ href, label, active }) => (
        <Link key={href} href={href} className={cn('text-sm font-medium transition-colors hover:text-primary', {
          'text-black dark:text-white border-b-[2px] border-black dark:border-white': active,
          'text-muted-foreground': !active,
        })}>{label}</Link>
      ))}
    </nav>
  )
}

