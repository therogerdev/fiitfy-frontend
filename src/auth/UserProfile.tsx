import { useAuth } from "@/hooks/useAuth";

const UserProfile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found. Please log in.</div>;
  }

  console.log(user.role);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Type: {user.role}</p>
      {/* Display other user information as needed */}
    </div>
  );
};

export default UserProfile;
