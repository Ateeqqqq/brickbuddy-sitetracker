import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/Input";
import { AuthLayout } from "./AuthLayout";
import { authService } from "../../services/authService";
import { useState } from "react";

interface RegisterForm {
  name: string;
  company: string;
  email: string;
  password: string;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = handleSubmit(async (values) => {
    try {
      setServerError(null);
      const response = await authService.register(values);
      localStorage.setItem("brickbuddy_token", response.data.access_token);
      navigate("/app");
    } catch {
      setServerError("Registration failed. Please try again with different details.");
    }
  }, (formErrors) => {
    setServerError(formErrors.name?.message ?? formErrors.company?.message ?? formErrors.email?.message ?? formErrors.password?.message ?? null);
  });

  return (
    <AuthLayout title="Create your workspace" subtitle="Start tracking your projects with a frontend-ready demo account.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField label="Full name" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
        <TextField label="Company" error={errors.company?.message} {...register("company", { required: "Company is required" })} />
        <TextField label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <TextField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Use at least 6 characters" } })}
        />
        {serverError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{serverError}</p>}
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
