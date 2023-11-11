import { SvgIconPropsWithStrokeWidthType } from "@/lib/models/SvgIconPropsWithStrokeWidthType";
import { cn } from "@/lib/utils";

export const UnplugOutlineIcon = (props: SvgIconPropsWithStrokeWidthType) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={cn("lucide lucide-unplug text-neutral-700 dark:text-white", props.className)}
      >
         <path d="m19 5 3-3" />
         <path d="m2 22 3-3" />
         <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
         <path d="M7.5 13.5 10 11" />
         <path d="M10.5 16.5 13 14" />
         <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
      </svg>
   );
};
