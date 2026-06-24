import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/Input";
import { AuthLayout } from "./AuthLayout";
import { authService } from "../../services/authService";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: { email: "admin@brickbuddy.com", password: "password" } });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setServerError(null);
      const response = await authService.login(values);
      localStorage.setItem("brickbuddy_token", response.data.access_token);
      navigate("/app");
    } catch {
      setServerError("Login failed. Check your email and password, then try again.");
    }
  }, (formErrors) => {
    setServerError(formErrors.email?.message ?? formErrors.password?.message ?? null);
  });

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage projects, updates, reports, and teams.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <TextField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-muted">
            <input type="checkbox" className="h-4 w-4 rounded border-line text-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
        </div>
        {serverError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{serverError}</p>}
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-muted">
        New to BrickBuddy?{" "}
        <Link to="/register" className="font-semibold text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
