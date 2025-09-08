// Password strength indicator
const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: 'bg-red-500' };
      case 2:
        return { text: 'Weak', color: 'bg-orange-500' };
      case 3:
        return { text: 'Fair', color: 'bg-yellow-500' };
      case 4:
        return { text: 'Good', color: 'bg-blue-500' };
      case 5:
        return { text: 'Strong', color: 'bg-green-500' };
      default:
        return { text: '', color: '' };
    }
  };

  const strengthInfo = getStrengthText(strength);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-1">
        <div className="flex-1 bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${strengthInfo.color}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{strengthInfo.text}</span>
      </div>
    </div>
  );
};

export default PasswordStrength;
