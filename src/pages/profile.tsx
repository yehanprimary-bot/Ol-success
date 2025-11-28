import { useState, useEffect } from "react";
import MobileShell from "@/components/layout/MobileShell";
import { Button } from "@/components/ui/button";
import { LogOut, Phone, Shield, User, WalletCards, Settings, ChevronRight, Code, Download } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("current_user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      // Fallback if no user is stored but they are authenticated (e.g. hardcoded user from before update)
      // Or redirect to login
      setUser({
        realName: "Student Member",
        username: "nnc_student",
        phone: "N/A"
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("current_user");
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
    // Force reload to reset app state
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <MobileShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-indigo-500/20" />
          
          <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-xl flex items-center justify-center text-primary relative z-10 mb-3">
            <User className="w-10 h-10" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground">{user.realName || "Student Member"}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          
          <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t border-border">
            <div>
              <div className="text-lg font-bold text-foreground">0</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Papers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">0</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Saved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">4</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">Account Details</h3>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Username</span>
              </div>
              <span className="text-sm text-muted-foreground">{user.username}</span>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Phone</span>
              </div>
              <span className="text-sm text-muted-foreground">{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Member Status</span>
              </div>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Settings Section (Mock) */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">App Settings</h3>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-border hover:bg-secondary/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">General Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
             <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <WalletCards className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Subscription</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Developer Options */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">Developer</h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <a 
              href="/OL_Master_Source.zip" 
              download 
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Download Source Code</span>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full h-12 rounded-xl font-bold shadow-lg shadow-red-500/20"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </Button>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Application Developer
          </p>
          <p className="text-sm font-medium text-primary/80 font-heading">
            Yehan Pabasara
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">v1.0.2 (Mockup)</p>
        </div>
      </div>
    </MobileShell>
  );
}
