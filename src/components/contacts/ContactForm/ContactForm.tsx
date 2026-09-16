import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  // sendContactMessage,
  type ContactFormData,
} from '@/services/contactApi';

const CONTACT_PATTERN = /^(?:\+?[0-9][0-9\s()-]{6,19}|@[a-zA-Z0-9_]{5,32})$/;

export const ContactForm = () => {
  const { t } = useTranslation();

  const [submitError, setSubmitError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      contact: '',
      message: '',
    },
    mode: 'onBlur',
  });

  const message = watch('message');

  const onSubmit = async (_data: ContactFormData) => {
    setSubmitError(false);

    // Temporary optimistic UI until API is connected
    setIsSuccess(true);

    try {
      // await sendContactMessage(_data);

      reset();
    } catch {
      setIsSuccess(false);
      setSubmitError(true);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        className="
          flex min-h-[430px] flex-col
          items-center justify-center
          rounded-[24px]
          border border-[var(--color-border)]
          bg-[var(--color-surface)]
          px-6 text-center
          shadow-[var(--shadow-card)]
        "
      >
        <div
          className="
            grid h-14 w-14 place-items-center
            rounded-full
            bg-[rgba(34,204,86,0.1)]
            text-[var(--color-primary)]
          "
        >
          <CheckCircle2 size={28} />
        </div>

        <h2
          className="
            mt-5 text-xl font-bold
            text-[var(--color-text-primary)]
          "
        >
          {t('contacts.form.successTitle')}
        </h2>

        <p
          className="
            mt-2 max-w-[360px]
            text-sm leading-6
            text-[var(--color-text-secondary)]
          "
        >
          {t('contacts.form.successDescription')}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="
        rounded-[24px]
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
        shadow-[var(--shadow-card)]
        sm:p-6
      "
    >
      <h2
        className="
          text-xl font-bold tracking-[-0.02em]
          text-[var(--color-text-primary)]
        "
      >
        {t('contacts.form.title')}
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="
              mb-2 block text-[13px] font-semibold
              text-[var(--color-text-primary)]
            "
          >
            {t('contacts.form.name')}
          </label>

          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name', {
              required: t('contacts.validation.nameRequired'),
              minLength: {
                value: 2,
                message: t('contacts.validation.nameMin'),
              },
              validate: (value) =>
                value.trim().length >= 2 || t('contacts.validation.nameMin'),
            })}
            placeholder={t('contacts.form.namePlaceholder')}
            className={`
              h-12 w-full rounded-xl border
              bg-[var(--color-card)]
              px-4 text-sm
              text-[var(--color-text-primary)]
              outline-none transition

              placeholder:text-[var(--color-text-muted)]

              focus:border-[var(--color-primary)]
              focus:ring-2
              focus:ring-[rgba(34,204,86,0.12)]

              ${
                errors.name
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--color-border)]'
              }
            `}
          />

          {errors.name && (
            <p
              role="alert"
              className="
                mt-1.5 text-xs font-medium
                text-[var(--color-error)]
              "
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-value"
            className="
              mb-2 block text-[13px] font-semibold
              text-[var(--color-text-primary)]
            "
          >
            {t('contacts.form.contact')}
          </label>

          <input
            id="contact-value"
            type="text"
            autoComplete="tel"
            aria-invalid={Boolean(errors.contact)}
            {...register('contact', {
              required: t('contacts.validation.contactRequired'),
              pattern: {
                value: CONTACT_PATTERN,
                message: t('contacts.validation.contactInvalid'),
              },
            })}
            placeholder={t('contacts.form.contactPlaceholder')}
            className={`
              h-12 w-full rounded-xl border
              bg-[var(--color-card)]
              px-4 text-sm
              text-[var(--color-text-primary)]
              outline-none transition

              placeholder:text-[var(--color-text-muted)]

              focus:border-[var(--color-primary)]
              focus:ring-2
              focus:ring-[rgba(34,204,86,0.12)]

              ${
                errors.contact
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--color-border)]'
              }
            `}
          />

          {errors.contact && (
            <p
              role="alert"
              className="
                mt-1.5 text-xs font-medium
                text-[var(--color-error)]
              "
            >
              {errors.contact.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="
                text-[13px] font-semibold
                text-[var(--color-text-primary)]
              "
            >
              {t('contacts.form.message')}
            </label>

            <span
              className="
                text-[11px]
                text-[var(--color-text-muted)]
              "
            >
              {t('contacts.form.optional')}
            </span>
          </div>

          <textarea
            id="contact-message"
            rows={5}
            maxLength={500}
            aria-invalid={Boolean(errors.message)}
            {...register('message', {
              maxLength: {
                value: 500,
                message: t('contacts.validation.messageMax'),
              },
            })}
            placeholder={t('contacts.form.messagePlaceholder')}
            className={`
              w-full resize-none rounded-xl border
              bg-[var(--color-card)]
              px-4 py-3 text-sm leading-6
              text-[var(--color-text-primary)]
              outline-none transition

              placeholder:text-[var(--color-text-muted)]

              focus:border-[var(--color-primary)]
              focus:ring-2
              focus:ring-[rgba(34,204,86,0.12)]

              ${
                errors.message
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--color-border)]'
              }
            `}
          />

          <div className="mt-1 flex justify-between gap-3">
            <div>
              {errors.message && (
                <p
                  role="alert"
                  className="
                    text-xs font-medium
                    text-[var(--color-error)]
                  "
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <span
              className="
                shrink-0 text-[11px]
                text-[var(--color-text-muted)]
              "
            >
              {message.length} / 500
            </span>
          </div>
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="
            mt-4 rounded-xl
            border border-[rgba(239,68,68,0.2)]
            bg-[rgba(239,68,68,0.07)]
            px-4 py-3
            text-xs font-medium
            text-[var(--color-error)]
          "
        >
          {t('contacts.form.submitError')}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          mt-5 flex h-12 w-full
          items-center justify-center gap-2
          rounded-xl
          bg-[var(--color-primary)]
          px-5 text-sm font-bold
          text-[#071109]
          transition

          hover:bg-[var(--color-primary-hover)]

          disabled:cursor-not-allowed
          disabled:opacity-60

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--color-primary)]
          focus-visible:ring-offset-2
        "
      >
        {isSubmitting ? t('contacts.form.sending') : t('contacts.form.submit')}

        {!isSubmitting && <ArrowRight size={17} />}
      </button>

      <p
        className="
          mt-3 text-center text-[11px]
          text-[var(--color-text-muted)]
        "
      >
        {t('contacts.form.responseTime')}
      </p>
    </form>
  );
};
