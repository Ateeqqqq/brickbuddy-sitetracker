import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/Input";
import { AuthLayout } from "./AuthLayout";

interface ForgotForm {
  email: string;
}

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ForgotForm>();

  return (
    <AuthLayout title="Reset password" subtitle="Enter your email and BrickBuddy will send password reset instructions.">
      <form className="space-y-4" onSubmit={handleSubmit(() => undefined)}>
        <TextField label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <Button type="submit" className="w-full">Send reset link</Button>
      </form>
      {isSubmitSuccessful && <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700">Reset instructions are ready to be sent by the future API.</p>}
      <p className="mt-6 text-center text-sm text-ink-muted">
        Remembered your password?{" "}
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
