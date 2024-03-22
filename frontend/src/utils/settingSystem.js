export const ACCESS_TOKEN_WEB_BLINKBLINK = "ACCESS_TOKEN_WEB_BLINKBLINK";
export const configHeader = () => {
  return {
    headers: {
      Authorization: localStorage.getItem(ACCESS_TOKEN_WEB_BLINKBLINK)
        ? "Bearer " + localStorage.getItem(ACCESS_TOKEN_WEB_BLINKBLINK)
        : null,
    },
  };
};
