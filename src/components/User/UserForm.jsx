import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../../context/ToastContext';

const userSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .regex(/^[A-Za-z]+$/, 'First name cannot contain numbers'),

    lastName: z
      .string()
      .min(1, 'Last name is required')
      .regex(/^[A-Za-z]+$/, 'Last name cannot contain numbers'),

    birthDate: z.string().min(1, 'Birth date is required'),

    email: z
      .string()
      .email('Invalid email')
      .refine((value) => value.endsWith('.com'), {
        message: 'Email must end with .com',
      }),

    password: z
      .string()
      .min(6, 'Password minimum 6 characters')
      .regex(/[A-Z]/, 'Need one capital letter')
      .regex(/[a-z]/, 'Need one small letter')
      .regex(/[^A-Za-z0-9]/, 'Need one special character'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export default function UserForm() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  function submit(data) {
    console.log(data);

    showToast('success', 'Success', 'User created successfully!');
  }

  function submitError(errors) {
    console.log('FORM ERRORS:', errors);

    const firstError = Object.values(errors)[0];

    showToast('error', 'Error', firstError?.message || 'Form is invalid');
  }

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit(submit, submitError)}>
        <div className="form-group">
          <input
            placeholder="First Name"
            {...register('firstName')}
            className={errors.firstName ? 'error' : ''}
          />

          <p>{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <input
            placeholder="Last Name"
            {...register('lastName')}
            className={errors.lastName ? 'error' : ''}
          />

          <p>{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <input
            type="date"
            {...register('birthDate')}
            className={errors.birthDate ? 'error' : ''}
          />

          <p>{errors.birthDate?.message}</p>
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            {...register('email')}
            className={errors.email ? 'error' : ''}
          />

          <p>{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={errors.password ? 'error' : ''}
          />

          <p>{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'error' : ''}
          />

          <p>{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
