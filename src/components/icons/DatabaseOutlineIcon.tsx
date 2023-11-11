import { SvgIconPropsWithStrokeWidthType } from "@/lib/models/SvgIconPropsWithStrokeWidthType";
import { cn } from "@/lib/utils";

export const DatabaseOutlineIcon = (props: SvgIconPropsWithStrokeWidthType) => {
   return (
      <svg
         className={cn("text-neutral-700 dark:text-white", props.className)}
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 18 20"
      >
         <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${props.strokeWidth ?? 1}`}
            d="M17 4c0 1.657-3.582 3-8 3S1 5.657 1 4m16 0c0-1.657-3.582-3-8-3S1 2.343 1 4m16 0v6M1 4v6m0 0c0 1.657 3.582 3 8 3s8-1.343 8-3M1 10v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
         />
      </svg>
   );
};
