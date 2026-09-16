import { mockFetch } from './mockFetch';

export type ContactFormData = {
  name: string;
  contact: string;
  message: string;
};

export type ContactResponse = {
  success: true;
};

export const sendContactMessage = (
  data: ContactFormData,
): Promise<ContactResponse> => {
  return mockFetch<ContactResponse>({
    success: true,
  });
};
