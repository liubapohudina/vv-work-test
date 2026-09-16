import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendContactMessage } from '@/services/contactApi';

import { ContactForm } from './ContactForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/services/contactApi', () => ({
  sendContactMessage: vi.fn(),
}));

const mockedSendContactMessage = vi.mocked(sendContactMessage);

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedSendContactMessage.mockResolvedValue({
      success: true,
    });
  });

  it('renders contact form', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('contacts.form.name')).toBeInTheDocument();

    expect(screen.getByLabelText('contacts.form.contact')).toBeInTheDocument();

    expect(screen.getByLabelText('contacts.form.message')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'contacts.form.submit',
      }),
    ).toBeInTheDocument();
  });

  it('shows required errors when required fields are empty', async () => {
    render(<ContactForm />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'contacts.form.submit',
      }),
    );

    expect(
      await screen.findByText('contacts.validation.nameRequired'),
    ).toBeInTheDocument();

    expect(
      await screen.findByText('contacts.validation.contactRequired'),
    ).toBeInTheDocument();

    expect(mockedSendContactMessage).not.toHaveBeenCalled();
  });

  it('shows validation error when name is too short', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('contacts.form.name');

    fireEvent.change(nameInput, {
      target: {
        value: 'A',
      },
    });

    fireEvent.blur(nameInput);

    expect(
      await screen.findByText('contacts.validation.nameMin'),
    ).toBeInTheDocument();
  });

  it('rejects a name containing only spaces', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('contacts.form.name');

    fireEvent.change(nameInput, {
      target: {
        value: '   ',
      },
    });

    fireEvent.blur(nameInput);

    expect(
      await screen.findByText('contacts.validation.nameMin'),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid contact', async () => {
    render(<ContactForm />);

    const contactInput = screen.getByLabelText('contacts.form.contact');

    fireEvent.change(contactInput, {
      target: {
        value: 'invalid-contact',
      },
    });

    fireEvent.blur(contactInput);

    expect(
      await screen.findByText('contacts.validation.contactInvalid'),
    ).toBeInTheDocument();
  });

  it('accepts a valid phone number', async () => {
    render(<ContactForm />);

    const contactInput = screen.getByLabelText('contacts.form.contact');

    fireEvent.change(contactInput, {
      target: {
        value: '+48 123 456 789',
      },
    });

    fireEvent.blur(contactInput);

    await waitFor(() => {
      expect(
        screen.queryByText('contacts.validation.contactInvalid'),
      ).not.toBeInTheDocument();
    });
  });

  it('accepts a valid username starting with @', async () => {
    render(<ContactForm />);

    const contactInput = screen.getByLabelText('contacts.form.contact');

    fireEvent.change(contactInput, {
      target: {
        value: '@username',
      },
    });

    fireEvent.blur(contactInput);

    await waitFor(() => {
      expect(
        screen.queryByText('contacts.validation.contactInvalid'),
      ).not.toBeInTheDocument();
    });
  });

  it('shows current message character count', () => {
    render(<ContactForm />);

    const messageInput = screen.getByLabelText('contacts.form.message');

    fireEvent.change(messageInput, {
      target: {
        value: 'Hello',
      },
    });

    expect(screen.getByText('5 / 500')).toBeInTheDocument();
  });

  it('shows success state after valid submit', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('contacts.form.name'), {
      target: {
        value: 'Anna',
      },
    });

    fireEvent.change(screen.getByLabelText('contacts.form.contact'), {
      target: {
        value: '+48 123 456 789',
      },
    });

    fireEvent.change(screen.getByLabelText('contacts.form.message'), {
      target: {
        value: 'Hello!',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'contacts.form.submit',
      }),
    );

    expect(
      await screen.findByText('contacts.form.successTitle'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('contacts.form.successDescription'),
    ).toBeInTheDocument();

    expect(mockedSendContactMessage).toHaveBeenCalledTimes(1);

    expect(mockedSendContactMessage).toHaveBeenCalledWith({
      name: 'Anna',
      contact: '+48 123 456 789',
      message: 'Hello!',
    });
  });

  it('does not submit when contact is invalid', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('contacts.form.name'), {
      target: {
        value: 'Anna',
      },
    });

    fireEvent.change(screen.getByLabelText('contacts.form.contact'), {
      target: {
        value: 'wrong',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'contacts.form.submit',
      }),
    );

    expect(
      await screen.findByText('contacts.validation.contactInvalid'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('contacts.form.successTitle'),
    ).not.toBeInTheDocument();

    expect(mockedSendContactMessage).not.toHaveBeenCalled();
  });

  it('shows submit error when request fails', async () => {
    mockedSendContactMessage.mockRejectedValueOnce(new Error('Request failed'));

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('contacts.form.name'), {
      target: {
        value: 'Anna',
      },
    });

    fireEvent.change(screen.getByLabelText('contacts.form.contact'), {
      target: {
        value: '+48 123 456 789',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'contacts.form.submit',
      }),
    );

    expect(
      await screen.findByText('contacts.form.submitError'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('contacts.form.successTitle'),
    ).not.toBeInTheDocument();

    expect(mockedSendContactMessage).toHaveBeenCalledTimes(1);

    expect(mockedSendContactMessage).toHaveBeenCalledWith({
      name: 'Anna',
      contact: '+48 123 456 789',
      message: '',
    });
  });
});
