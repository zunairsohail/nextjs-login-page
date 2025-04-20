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
    <div className="login-container ">
      <div className="login-card ml-32"> {/* Transparent, minimal card now */}
        {/* Header Section */}
        <div className=" space-y-1 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Sign in to manage</h1>
          <p className="text-s text-white">Enter your details below:</p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm">Email Address</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      className="h-9 w-64 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex justify-between w-64">
                    <Label htmlFor="password" className="text-white text-sm">Password</Label>
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
                      className="h-9 w-64 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className=" w-64 h-10 mt-2 text-sm"
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
