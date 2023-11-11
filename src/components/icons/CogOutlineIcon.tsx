import { SvgIconPropsWithStrokeWidthType } from "@/lib/models/SvgIconPropsWithStrokeWidthType";
import { cn } from "@/lib/utils";

export const CogOutlineIcon = (props: SvgIconPropsWithStrokeWidthType) => {
   return (
      <svg
         className={cn("text-neutral-700 dark:text-white", props.className)}
         style={{ width: `${props.size ?? 16}px`, height: `${props.size ?? 16}px`, ...props.style }}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 20 20"
      >
         <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${props.strokeWidth ?? 1}`}
         >
            <path d="M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z" />
            <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
         </g>
      </svg>
   );
};
