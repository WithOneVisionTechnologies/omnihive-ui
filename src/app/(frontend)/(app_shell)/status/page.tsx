import { InfoCircleSolidIcon } from "@/components/icons/InfoCircleSolidIcon";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnvironmentVariableStatus } from "@/lib/enums/EnvironmentVariableStatusEnum";
import { AwaitHelper } from "@/lib/helpers/AwaitHelper";
import { ConfigService } from "@/lib/services/ConfigService";
import { cn } from "@/lib/utils";

const StatusHome = async () => {
   const configService = new ConfigService();
   const environmentVariables = configService.buildEnvVariables();
   const configDbStatus = await AwaitHelper.execute(configService.checkConfigDatabaseConnection());

   const getVariableClass = (variable: EnvironmentVariableStatus) => {
      if (variable === "ok") {
         return "bg-global-success";
      } else if (variable === "error") {
         return "bg-global-error";
      } else if (variable === "warning") {
         return "bg-global-warning";
      } else if (variable === "info") {
         return "bg-global-info";
      } else {
         return "";
      }
   };

   return (
      <div className="ml-auto mr-auto w-3/4">
         <div className="mb-10 mt-10 flex flex-col">
            <div className="text-center text-xl font-bold">OmniHive Status</div>
            <Separator className="mt-2" />
            <div className="mb-4 mt-8">
               <div>
                  <span className="font-semibold italic underline">Environment Variables</span>&nbsp;&nbsp;:&nbsp;These
                  are the environment variables that are available to the OmniHive application.
               </div>
            </div>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Variable</TableHead>
                     <TableHead className="text-center">Status</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {environmentVariables.envVariables.map((variable) => (
                     <TableRow key={variable.name}>
                        <TableCell className="w-5/6">
                           <div className="flex items-center">
                              <div>
                                 {variable.name}
                                 {variable.schema.isOptional() === false && (
                                    <span className="ml-1 font-bold text-red-600">*</span>
                                 )}
                              </div>
                              <div className="-mt-2 ml-1">
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger>
                                          <InfoCircleSolidIcon size={16} />
                                       </TooltipTrigger>
                                       <TooltipContent>{variable.description ?? ""}</TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              </div>
                           </div>
                        </TableCell>
                        <TableCell className={cn("text-center font-semibold", getVariableClass(variable.status))}>
                           <div className="flex justify-center text-white">
                              {variable.status.toUpperCase()}
                              {variable.status !== "ok" && (
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger>
                                          <InfoCircleSolidIcon size={16} />
                                       </TooltipTrigger>
                                       <TooltipContent>{variable.error ?? ""}</TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              )}
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <div className="mb-4 mt-8">
               <div>
                  <span className="font-semibold italic underline">Connections</span>&nbsp;&nbsp;:&nbsp;These are the
                  connections that are available to the OmniHive application including the configuration database.
               </div>
            </div>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Connection</TableHead>
                     <TableHead className="text-center">Status</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell className="w-5/6">
                        <div>OmniHive Config Database</div>
                     </TableCell>
                     <TableCell
                        className={cn(
                           "text-center font-semibold",
                           configDbStatus === true ? "bg-global-success" : "bg-global-error",
                        )}
                     >
                        <div className="text-center text-white">{configDbStatus === true ? "OK" : "ERROR"}</div>
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </div>
      </div>
   );
};

export default StatusHome;
