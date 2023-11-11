const AdminLayout = (props: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-row">
         <div>Admin Side Menu</div>
         <div>{props.children}</div>
      </div>
   );
};

export default AdminLayout;
