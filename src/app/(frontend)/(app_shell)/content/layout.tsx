const ContentLayout = (props: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-row">
         <div>Content Side Menu</div>
         <div>{props.children}</div>
      </div>
   );
};

export default ContentLayout;
