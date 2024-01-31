import { Activity, Boxes, Layers, Package, Palette, Presentation, Ruler } from "lucide-react";

const Icon = ({ label }: { label: string }) => {
    let icon = null
    switch (label) {
        case "Dashboard":
            icon = <Activity size={15}/>
            break;
        case "Billboards":
            icon = <Presentation size={15} />
            break;
        case "Categories":
            icon = <Layers size={15} />
            break;
        case "Sizes":
            icon = <Ruler size={15} />
            break;
        case "Colors":
            icon = <Palette size={15} />
            break;
        case "Products":
            icon = <Package size={15} />
            break;
        case "Orders":
            icon = <Boxes size={15} />
            break;

    }
    return icon
}

export default Icon