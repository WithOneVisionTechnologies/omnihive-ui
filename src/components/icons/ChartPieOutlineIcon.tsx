import { SvgIconPropsWithStrokeWidthType } from "@/lib/models/SvgIconPropsWithStrokeWidthType";
import { cn } from "@/lib/utils";

export const ChartPieOutlineIcon = (props: SvgIconPropsWithStrokeWidthType) => {
   return (
      <svg
         className={cn("text-neutral-700 dark:text-white", props.className)}
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 21 21"
      >
         <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${props.strokeWidth ?? 1}`}
         >
            <path d="M9 4.025A7.5 7.5 0 1 0 16.975 12H9V4.025Z" />
            <path d="M12.5 1c-.169 0-.334.014-.5.025V9h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 12.5 1Z" />
         </g>
      </svg>
   );
};
