"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন"),
  password: z.string().min(1, "পাসওয়ার্ড প্রয়োজন"),
  role: z.enum(["super_admin", "admin", "student"], {
    message: "অনুগ্রহ করে একটি রোল নির্বাচন করুন",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginFeature() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@example.com",
      password: "password123",
      role: "super_admin",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    dispatch(
      login({
        id: "usr-" + Math.random().toString(36).substring(7),
        name: data.email.split("@")[0].toUpperCase(),
        email: data.email,
        role: data.role,
      })
    );

    switch (data.role) {
      case "super_admin":
        router.push("/super-admin/dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "student":
        router.push("/student"); 
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[400px] border-t-4 border-t-primary shadow-lg">
        <CardHeader>
          <CardTitle>এমসিকিউ (MCQ) প্ল্যাটফর্মে লগইন করুন</CardTitle>
          <CardDescription>অ্যাপ্লিকেশন টেস্ট করতে একটি ডেমো রোল বেছে নিন।</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input id="email" type="email" {...register("email")} className="focus-visible:ring-primary" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input id="password" type="password" {...register("password")} className="focus-visible:ring-primary" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>রোল (Role)</Label>
              <Select onValueChange={(val) => setValue("role", val as "super_admin" | "admin" | "student")}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="রোল নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">সুপার এডমিন</SelectItem>
                  <SelectItem value="admin">এডমিন (শিক্ষক)</SelectItem>
                  <SelectItem value="student">ছাত্র/ছাত্রী</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-4 hover:shadow-md transition-all">লগইন</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
