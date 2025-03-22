const UserProfile = ({ user, logout }) => {
  return (
    <p>
      Hello {user.name} -{' '}
      <span>
        <button onClick={logout}>Logout</button>
      </span>
    </p>
  );
};

export default UserProfile;
