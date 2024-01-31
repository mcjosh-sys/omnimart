import { cn } from "@/lib/utils"
import { Store } from "@prisma/client"
import { Activity, X } from "lucide-react"
import { StoreSwitcher } from "./store-switcher"
import { Button } from "./ui/button"
import { useParams, usePathname } from "next/navigation"
import { getRoutes } from "@/actions/get-routes"
import Link from "next/link"
import IconButton from "./ui/icon-button"
import Icon from "./icon"
import { useEffect, useRef } from "react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useTheme } from "next-themes"

interface SidePanelProps {
    className?: string
    onClose: () => void
    stores: Store[]
}

const SidePanel: React.FC<SidePanelProps> = ({ className, onClose, stores }) => {
    const pathname = usePathname()
    const params = useParams()

    const routes = getRoutes(pathname, params)

    const { theme, setTheme } = useTheme()

    const onCheckChange = (checked: boolean) => {

        if (checked)
            setTheme("dark")
        else
            setTheme("light")
    }

    useEffect(() => {
        onClose()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])


    return (
        <div className={cn("fixed top-0 left-0 h-full w-full z-50 backdrop-blur-md", className)}>
            <div className="bg-background h-full w-[45%]">
                <div className="flex justify-end">
                    <Button
                        onClick={onClose}
                        variant="ghost"
                    >
                        <X />
                    </Button>
                </div>
                <div className="divide-y space-y-4 px-4 pt-8 gap-y-4 flex flex-col">
                    <div className="text-muted-foreground flex justify-between items-center">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <Switch id="dark-mode" checked={theme === "dark" ? true : false} onCheckedChange={onCheckChange} />
                    </div>

                    <div className="text-muted-foreground pt-4">
                        <h1 className="font-semibold">Switch store</h1>
                        <div className="pt-2">
                            <StoreSwitcher items={stores} />
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        {routes.map(({ href, active, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn("flex items-center rounded-sm py-2 gap-x-2 group hover:text-primary", {
                                    "text-primary": active,
                                    "text-muted-foreground": !active,
                                })}
                            >
                                <div className={cn("rounded group-hover:bg-muted w-6 h-6 flex justify-center items-center mr-2", { "bg-muted": active })}>
                                    <Icon label={label} />
                                </div>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePanel