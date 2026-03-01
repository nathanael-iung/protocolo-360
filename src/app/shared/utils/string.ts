export const getInitials = (fullName: string): string => {
  if (!fullName) return '';
  
  const names = fullName.trim().split(/\s+/);
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);
  
  return (firstInitial + lastInitial).toUpperCase();
};

export const getFirstAndLast = (fullName: string): string => {
  if (!fullName) return '';
  
  const names = fullName.trim().split(/\s+/);
  
  if (names.length === 1) {
    return names[0];
  }
  
  return `${names[0]} ${names[names.length - 1]}`;
};