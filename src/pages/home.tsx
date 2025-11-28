import MobileShell from "@/components/layout/MobileShell";
import { SUBJECTS } from "@/lib/mockData";
import { Link } from "wouter";
import { ArrowRight, Clock, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Featured Subjects (First 4)
  const featuredSubjects = SUBJECTS.slice(0, 4);

  return (
    <MobileShell>
      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Good Morning, Student! 👋</h1>
        <p className="text-muted-foreground text-sm">Ready to ace your O-Levels today?</p>
      </section>

      {/* Stats/Progress Card */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8">
            <Trophy className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg">Weekly Streak</h3>
                <p className="text-blue-100 text-sm">You're on fire! 🔥</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-sm font-bold">
                Day 4
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className={`flex-1 h-2 rounded-full ${day <= 4 ? 'bg-white' : 'bg-white/20'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continue Studying */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">Mathematics - 2022</h4>
            <p className="text-xs text-muted-foreground">Paper I • English Medium</p>
          </div>
          <button className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            Resume
          </button>
        </div>
      </section>

      {/* Popular Subjects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Popular Subjects</h2>
          <Link href="/subjects" className="text-sm font-medium text-primary flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featuredSubjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Link key={subject.id} href={`/subjects/${subject.id}`}>
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <div className={`${subject.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{subject.name}</h3>
                    <p className="text-xs text-muted-foreground">{subject.papers.length} Papers</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </MobileShell>
  );
}
