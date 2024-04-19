import { cn } from "@/lib/utils"
import { Store } from "@prisma/client"
import { StoreSwitcher } from "./store-switcher"
import { useParams, usePathname } from "next/navigation"
import { getRoutes } from "@/actions/get-routes"
import Link from "next/link"
import Icon from "./icon"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useTheme } from "next-themes"
import { SheetClose, SheetContent } from "./ui/sheet"

interface SidePanelProps {
    className?: string
    stores: Store[]
}

const SidePanel: React.FC<SidePanelProps> = ({ className, stores }) => {
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


    return (
        <SheetContent
            side='left'
            className={cn("z-50 backdrop-blur-md", className)}
        >
            <div className="divide-y space-y-4 px-4 pt-8 gap-y-4 flex flex-col">
                <div className="text-muted-foreground flex justify-between items-center">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch id="dark-mode" checked={theme === "dark" ? true : false} onCheckedChange={onCheckChange} />
                </div>

                <div className="text-muted-foreground pt-6">
                    <p>Switch store</p>
                    <div className="pt-2">
                        <StoreSwitcher items={stores} />
                    </div>
                </div>

                <div className="flex flex-col pt-4">
                    {routes.map(({ href, active, label }) => (
                        <SheetClose
                            key={href}>
                            <Link
                                href={href}
                                className={cn("flex items-center rounded-sm p-2 gap-x-2 group hover:text-primary hover:bg-muted transition-all duration-500",
                                    {
                                    "text-primary font-semibold": active,
                                    "text-muted-foreground": !active,
                                    }
                                )}
                            >
                                <div className={cn("w-8 h-8 flex justify-center items-center mr-2 object-cover")}>
                                    <Icon label={label} />
                                </div>
                                {label}
                            </Link>
                        </SheetClose>
                    ))}
                </div>
            </div>
        </SheetContent>
    )
}

export default SidePanel