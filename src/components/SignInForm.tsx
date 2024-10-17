"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { login } from "@/app/login/action";
import { ToastAction } from "./ui/toast";

const FormSchema = z.object({
  email: z.string().email(),
  password : z.string().min(8),
})

export function SignInForm() {

  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await login(data);
    const resultObj = JSON.parse(result);
    if (resultObj.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your credential.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }else{
      toast({
        description: "Your Login successfully 😍",
      })
      router.push('/');  
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-3">
            <p className="text-xs">Don't have an account?</p>
            <Link className=" text-xs font-bold" href="/signup">Sing Up</Link>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
