import { UnplugIcon } from "lucide-react";

const DataLayout = (props: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-row">
         <div className="flex p-3">
            <div>
               <UnplugIcon />
            </div>
            <div>Connections</div>
         </div>
         <div>{props.children}</div>
      </div>
   );
};

export default DataLayout;
