import { Button } from "./button"

interface IconButtonProps {
    size?: number
    className?: string
    icon: React.ReactElement
}

const IconButton: React.FC<IconButtonProps> = ({className, icon}) => {
  return (
      <Button variant="ghost" size="sm" className={className}>
          {icon}
    </Button>
  )
}

export default IconButton