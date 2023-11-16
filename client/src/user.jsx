import appStore from "./app/appStore";

const User = () => {
  const user = appStore((state) => state.user);
  const setUser = appStore((state) => state.setUser);

  return (
    <div>
      <p>{user}</p>
      <input type="text" onChange={(e) => setUser(e.target.value)} />
    </div>
  );
};

export default User;
