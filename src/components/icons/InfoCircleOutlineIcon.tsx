import { SvgIconPropsWithStrokeWidthType } from "@/lib/models/SvgIconPropsWithStrokeWidthType";
import { cn } from "@/lib/utils";

export const InfoCircleOutlineIcon = (props: SvgIconPropsWithStrokeWidthType) => {
   return (
      <svg
         className={cn("text-neutral-700 dark:text-white", props.className)}
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 20 20"
      >
         <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${props.strokeWidth ?? 1}`}
            d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
         />
      </svg>
   );
};
