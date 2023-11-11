import { MainHeader } from "@/components/layout/MainHeader";

const AppShellLayout = (props: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-col">
         <MainHeader />
         <div>{props.children}</div>
      </div>
   );
};
export default AppShellLayout;
