"use client";

import { useState } from "react";
import {
  signInWithPassword,
  signUpWithPassword,
  signInWithGoogle,
} from "@/lib/auth-actions";

export default function LoginForm({
  error,
  message,
}: {
  error?: string;
  message?: string;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div>
      {message && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 px-3.5 py-2.5 text-[12.5px] text-green-800">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-[12.5px] text-red-700">
          {error}
        </div>
      )}

      {/* Google */}
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-line bg-white py-2.5 text-sm font-bold text-ink transition hover:bg-bg"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z" />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 16 3 9.1 7.6 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36 26.7 37 24 37c-5.3 0-9.7-2.6-11.3-6.9l-6.5 5C9.4 41.3 16.2 45 24 45z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.4 35.8 45 30.5 45 24c0-1.2-.1-2.3-.4-3.5z" />
          </svg>
          Continue with Google
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-[11px] text-muted">
        <div className="h-px flex-1 bg-line" /> or <div className="h-px flex-1 bg-line" />
      </div>

      {/* Email + password */}
      <form
        action={mode === "signin" ? signInWithPassword : signUpWithPassword}
        className="grid gap-3"
      >
        {mode === "signup" && (
          <Field
            name="display_name"
            type="text"
            label="Display name"
            placeholder="e.g. Kartik"
          />
        )}
        <Field name="email" type="email" label="Email" placeholder="you@email.com" required />
        <Field
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
          minLength={6}
        />
        <button type="submit" className="btn-primary mt-1 w-full">
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-[12.5px] text-muted">
        {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="font-bold text-primary hover:underline"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

function Field({
  name,
  type,
  label,
  placeholder,
  required,
  minLength,
}: {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[11.5px] font-semibold text-muted">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="rounded-lg border-[1.5px] border-line bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-primary-l"
      />
    </label>
  );
}
