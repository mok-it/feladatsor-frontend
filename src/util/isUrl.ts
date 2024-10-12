export const isUrl = (url: string) => {
  // returns true if the url is a valid url but not a base64 string
  return (
    url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/) !==
    null
  );
};
