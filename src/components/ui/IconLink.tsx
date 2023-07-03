import Link from "next/link";
import { Button } from "./button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "link" | "interactive";
  Icon: React.ElementType;
  size?: "default" | "sm" | "lg" | "icon" | "raw";
  href: string;
}

export default function IconLink({
  Icon,
  href,
  children,
  variant,
  size,
  className,
}: IconButtonProps) {
  return (
    <Button size={size} variant={variant} className={className} asChild>
      <Link href={href}>
        <i className="mr-4 [&>svg>path]:stroke-current">
          {Icon !== undefined ? <Icon /> : null}
        </i>
        {children}
      </Link>
    </Button>
  );
}
