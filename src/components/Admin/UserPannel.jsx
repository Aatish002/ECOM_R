import { useUsersQuery } from "../../Hooks/Query/User/UserQuery";

const UsersPanel = () => {
  const { data: users, isLoading, isError, error } = useUsersQuery();

  if (isLoading) {
    return (
      <div className="bg-[#111] rounded-2xl p-10">
        <h2 className="text-2xl text-white">Loading users...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#111] rounded-2xl p-10">
        <h2 className="text-red-500">
          {error.response?.data?.message || "Failed to fetch users."}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">Users</h1>
          <p className="text-gray-400 mt-1">Total Users: {users.length}</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-black text-yellow-400">
          <tr>
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-gray-800 hover:bg-[#1a1a1a]"
            >
              <td className="p-4">{user.userName}</td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">{user.phoneNo}</td>

              <td className="p-4">
                {user.isAdmin ? (
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                    Admin
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold">
                    User
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPanel;
