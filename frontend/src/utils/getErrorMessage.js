export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  if (!error) return fallback;

  if (!error.response) {
    return 'Cannot reach server. Make sure the backend is running on port 5000.';
  }

  const data = error.response.data;
  if (data?.message) return data.message;
  if (data?.errors?.length) return data.errors.map((e) => e.msg).join(', ');
  return fallback;
};
