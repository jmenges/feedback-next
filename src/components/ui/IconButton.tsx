import { Button } from "./button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "link" | "interactive";
  Icon: React.ElementType;
}

export default function IconButton({
  Icon,
  children,
  variant,
  className,
}: IconButtonProps) {
  return (
    <Button variant={variant} className={className}>
      <i className="mr-4 [&>svg>path]:stroke-current">
        {Icon !== undefined ? <Icon /> : null}
      </i>
      {children}
    </Button>
  );
}
