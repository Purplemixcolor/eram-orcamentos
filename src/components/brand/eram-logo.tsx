import Image from "next/image";
import { cn } from "@/lib/utils";

type EramLogoProps = {
  className?: string;
  priority?: boolean;
};

export function EramLogo({ className, priority }: EramLogoProps) {
  return (
    <Image
      src="/brand/eram-logo.png"
      alt="Estaleiro ERAM Rio Amazonas"
      width={320}
      height={240}
      priority={priority}
      className={cn("h-auto w-44 object-contain", className)}
    />
  );
}
