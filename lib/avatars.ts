export const generateAvatar = (user: any): string => {
  return (
    user?.image ||
    `https://avatars.dicebear.com/api/bottts/:seed${user?.email}.svg`
  );
};
