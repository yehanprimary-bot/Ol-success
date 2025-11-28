import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Subjects from "@/pages/subjects";
import SubjectDetails from "@/pages/subject-details";
import PaperView from "@/pages/paper-view";
import Login from "@/pages/login";
import Profile from "@/pages/profile";
import { useState, useEffect } from "react";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [location, setLocation] = useLocation();

  // Check for existing session on mount (optional, but good for refresh)
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    } else if (location !== "/login") {
      setLocation("/login");
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/subjects" component={Subjects} />
      <Route path="/subjects/:id" component={SubjectDetails} />
      <Route path="/paper/:id" component={PaperView} />
      <Route path="/saved" component={() => <div className="p-8 text-center">Saved Papers (Coming Soon)</div>} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
