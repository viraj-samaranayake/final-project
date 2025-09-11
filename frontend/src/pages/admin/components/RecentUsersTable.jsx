import { Edit, Eye, Filter, Plus, Trash2 } from 'lucide-react';

const RecentUsersTable = () => {
  const users = [
    {
      id: 1,
      name: 'Kasun Perera',
      email: 'kasun@email.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-08-25',
    },
    {
      id: 2,
      name: 'Dr. Amara Silva',
      email: 'amara@email.com',
      role: 'Tutor',
      status: 'Pending',
      joinDate: '2024-08-24',
    },
    {
      id: 3,
      name: 'Nimali Fernando',
      email: 'nimali@email.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-08-23',
    },
    {
      id: 4,
      name: 'Prof. Sunil Kumar',
      email: 'sunil@email.com',
      role: 'Tutor',
      status: 'Active',
      joinDate: '2024-08-22',
    },
    {
      id: 5,
      name: 'Tharushi Wickrama',
      email: 'tharushi@email.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-08-21',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-sm font-medium text-gray-600 pb-3">
                Name
              </th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">
                Role
              </th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">
                Status
              </th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">
                Join Date
              </th>
              <th className="text-right text-sm font-medium text-gray-600 pb-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Tutor'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-600">{user.joinDate}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
