import MobileShell from "@/components/layout/MobileShell";
import { SUBJECTS } from "@/lib/mockData";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Subjects() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = SUBJECTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">All Subjects</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search for a subject..."
            className="w-full bg-secondary/50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredSubjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <Link key={subject.id} href={`/subjects/${subject.id}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow h-32 justify-center"
              >
                <div className={`${subject.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-br from-white/20 to-transparent`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-foreground">{subject.name}</h3>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <p>No subjects found matching "{searchQuery}"</p>
        </div>
      )}
    </MobileShell>
  );
}
