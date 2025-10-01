
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

import { register } from '@/services/authService';


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username is required!");
      return;
    }

    if (username.length < 3) {
      toast.error("Username too short!", {
        description: "Username must be at least 3 characters.",
      });
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password too short!", {
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    if (!confirmPassword.trim()) {
      toast.error("Confirm Password is required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        description: "Confirm Password must match the Password.",
      });
      return;
    }

    const payload = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const res = await register(payload);
      if (res.isSuccess && res.value) {
        navigate("/login");
        toast.success("Registration Successful! Please Login !", {
          description: ``,
        });
      }
      else {
        toast.error("Something went wrong!", {
          description: ` ${res.error.description}!`,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        description: ` ${error}!`,
      });
    }




    // ✅ If all validations pass:

  };

  const navigateToLogin = () => {
    // TODO: navigate to login page
    navigate('/login');
    console.log("Navigate to login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-200">
      <form
        onSubmit={handleRegister}
        className="max-w-sm mx-auto space-y-4 w-2xl rounded-[8px] bg-gray-50 p-[2rem]"
      >
        <div>
          <Label className="pb-1" htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourusername"
          />
        </div>

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

        <div>
          <Label className="pb-1" htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>

        <div className="flex justify-end">
          <Label
            className="font-bold text-amber-500 cursor-pointer"
            onClick={navigateToLogin}
          >
            Login here
          </Label>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

