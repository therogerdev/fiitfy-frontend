import UserProfile from "@/auth/UserProfile";

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-y-10'>
      <div className=''>DashboardPage</div>
      <div className=''>
        <UserProfile />
      </div>
    </div>
  );
};

export default DashboardPage;
