import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { setToken as token } from "@/utils/token";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const allowedDomains = ["gmail.com", "yahoo.com"];
  const domain = email.split("@")[1];
  const navigate = useNavigate();
const { setToken } = useAuth();

  const validateEmail = (email: string) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here

    if (!email.trim()) {
      toast.error("Email is required!", { description: "Please enter your email." });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format!", { description: "Enter a valid email address." });
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required!", { description: "Please enter your password." });
      return;
    }

    if (password.length < 6) {
      toast.error("Password too short!", { description: "Password must be at least 6 characters." });
      return;
    }

    if (!allowedDomains.includes(domain)) {
      toast.error("Invalid domain", { description: "Please use a valid email provider." });
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    try {
      const res = await login(payload);
      if (res.isSuccess && res.value) {
        console.log(res.value);
        token(res.value.token);
        setToken(res.value.token);
        navigate("/");
        toast.success("Login Successful!", { description: "Welcome!" });
      }
      else {
        toast.error(res.error?.description || "Login failed!");
      }

    } catch (err: any) {
      toast.error(err.error?.description || "Something went wrong!");
    }


  };
  const navigteTologin = () => {
    navigate('/register')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-200">

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 w-2xl rounded-[8px] bg-gray-50 p-[2rem]">
        <div>
          <Label className="pb-1" htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label className="pb-1" htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
        <div className="flex align-bottom justify-end">
          <Label className="font-bold text-amber-500 cursor-pointer" onClick={navigteTologin}>Register here</Label>
        </div>
      </form>
    </div>
  )
}

export default LoginPage