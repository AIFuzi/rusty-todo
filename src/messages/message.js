export const getErrorMessage = (message, msgApi) => {
  msgApi.open({
    type: 'error',
    content: message,
  });
};
