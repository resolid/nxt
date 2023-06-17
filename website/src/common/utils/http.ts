import { json } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const problem = (errors: any, revalidate = false) => {
  return json(
    {
      success: false,
      revalidate,
      errors,
    },
    { status: 422 }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const success = (data: any, revalidate = false) => {
  return json({
    success: true,
    revalidate,
    data,
  });
};
