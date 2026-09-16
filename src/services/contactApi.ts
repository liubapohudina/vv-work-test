import { mockFetch } from './mockFetch';

export type ContactFormData = {
  name: string;
  contact: string;
  message: string;
};

export type ContactResponse = {
  success: true;
};

export const sendContactMessage =
  () // data: ContactFormData, use later, when will be real api
  : Promise<ContactResponse> => {
    return mockFetch<ContactResponse>({
      success: true,
    });
  };
