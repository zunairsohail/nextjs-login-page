'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="login-container">
      <div className="login-card"> {/* Transparent, minimal card now */}
        {/* Header Section */}
        <div className="text-center space-y-1 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in to manage</h1>
          <p className="text-sm text-white">Enter your details below:</p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <Label htmlFor="email" className="login-label">Email Address</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      className="login-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="form-error" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="login-label">Password</Label>
                    <Link 
                      href="#" 
                      className="text-xs font-medium text-white hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="login-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="form-error" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="login-button"
              disabled={form.formState.isSubmitting}
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
