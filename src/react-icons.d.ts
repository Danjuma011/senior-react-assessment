declare module "react-icons/fa6" {
  import { ComponentType, SVGProps } from "react";
  
  export const FaArrowLeftLong: ComponentType<SVGProps<SVGSVGElement>>;
  // Add other icons as needed
}

declare module "react-icons/*" {
  import { ComponentType, SVGProps } from "react";
  
  const Icon: ComponentType<SVGProps<SVGSVGElement>>;
  export default Icon;
}
