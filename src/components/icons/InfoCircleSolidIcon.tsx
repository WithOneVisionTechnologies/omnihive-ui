import { SvgIconPropsType } from "@/lib/models/SvgIconPropsType";
import { cn } from "@/lib/utils";

export const InfoCircleSolidIcon = (props: SvgIconPropsType) => {
   return (
      <svg
         className={cn("text-neutral-700 dark:text-white", props.className)}
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 20 20"
      >
         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
   );
};
