import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, User, Phone, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration State
  const [isRegistering, setIsRegistering] = useState(false);
  const [regRealName, setRegRealName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Check hardcoded user
      const isHardcodedValid = username === "nnc_student" && password === "nnc2025";
      
      // Check local storage users
      let isLocalValid = false;
      try {
        const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
        const foundUser = storedUsers.find((u: any) => u.username === username && u.password === password);
        if (foundUser) isLocalValid = true;
      } catch (err) {
        console.error("Error reading users", err);
      }

      if (isHardcodedValid || isLocalValid) {
        // Store current user for profile display
        let currentUser;
        if (isLocalValid) {
            const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
            currentUser = storedUsers.find((u: any) => u.username === username && u.password === password);
        } else {
            currentUser = {
                realName: "NNC Student",
                username: "nnc_student",
                phone: "077 123 4567",
                password: "nnc" // dummy
            };
        }
        localStorage.setItem("current_user", JSON.stringify(currentUser));

        onLogin();
        toast({
          title: "Welcome back!",
          description: "Login successful.",
        });
        setLocation("/");
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid username or password.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Basic validation
      if (!regRealName || !regUsername || !regPhone || !regPassword) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "All fields are required.",
        });
        setIsLoading(false);
        return;
      }

      // Check if username exists (in local storage)
      const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      if (storedUsers.some((u: any) => u.username === regUsername) || regUsername === "nnc_student") {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Username already exists.",
        });
        setIsLoading(false);
        return;
      }

      // Save new user
      const newUser = {
        realName: regRealName,
        username: regUsername,
        phone: regPhone,
        password: regPassword
      };
      
      storedUsers.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(storedUsers));

      toast({
        title: "Registration Successful!",
        description: "You can now login with your new account.",
      });
      
      // Reset and switch to login
      setIsRegistering(false);
      setIsLoading(false);
      setUsername(regUsername); // Pre-fill login
      setPassword("");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 z-10"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/20">
            <span className="font-heading font-bold text-2xl">OL</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {isRegistering ? "Join us to access past papers" : "Sign in to access your past papers"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl shadow-black/5">
          <AnimatePresence mode="wait">
            {isRegistering ? (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Real Name"
                      value={regRealName}
                      onChange={(e) => setRegRealName(e.target.value)}
                      className="pl-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Username (for login)"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="pl-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="pl-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/25 mt-2" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register Member"}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/25 mt-2" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-primary hover:underline font-medium transition-all"
            >
              {isRegistering 
                ? "Already have an account? Sign In" 
                : "New Student? Register Member"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Developer Credit */}
      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground">
          Application Developer
        </p>
        <p className="text-sm font-medium text-primary/80 font-heading">
          Yehan Pabasara
        </p>
      </div>
    </div>
  );
}
