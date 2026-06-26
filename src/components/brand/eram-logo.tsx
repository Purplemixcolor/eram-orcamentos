import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";

type EramLogoProps = {
  className?: string;
  priority?: boolean;
};

export function EramLogo({ className, priority }: EramLogoProps) {
  return (
    <Image
      src={assetPath("/brand/eram-logo.png")}
      alt="Estaleiro ERAM Rio Amazonas"
      width={320}
      height={240}
      priority={priority}
      className={cn("h-auto w-44 object-contain", className)}
    />
  );
}
