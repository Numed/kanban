export const convertFirstLetterToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkIsValidUrl = (searchValue: string) => {
  const domain = "https://github.com/";
  if (!searchValue.startsWith(domain)) {
    return false;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};
