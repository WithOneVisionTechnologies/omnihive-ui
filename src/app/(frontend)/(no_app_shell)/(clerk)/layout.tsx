const ClerkLayout = (props: { children: React.ReactNode }) => {
   return (
      <div className="flex min-h-screen flex-col bg-neutral-800">
         <div className="m-auto">{props.children}</div>
      </div>
   );
};

export default ClerkLayout;
