import MobileShell from "@/components/layout/MobileShell";
import { SUBJECTS, Paper } from "@/lib/mockData";
import { useRoute, Link } from "wouter";
import { ChevronLeft, Download, Eye, FileText, Filter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubjectDetails() {
  const [, params] = useRoute("/subjects/:id");
  const subjectId = params?.id;
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const [yearFilter, setYearFilter] = useState<string>("all");

  if (!subject) {
    return (
      <MobileShell>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-xl font-bold mb-2">Subject Not Found</h2>
          <Link href="/subjects" className="text-primary font-medium">Go Back</Link>
        </div>
      </MobileShell>
    );
  }

  const Icon = subject.icon;
  
  // Group papers by year
  const papersByYear = subject.papers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, Paper[]>);

  const years = Object.keys(papersByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <MobileShell>
      {/* Header */}
      <div className="mb-6">
        <Link href="/subjects" className="inline-flex items-center text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Subjects
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`${subject.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{subject.name}</h1>
            <p className="text-muted-foreground text-sm">O-Level Past Papers</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <Button 
            variant={yearFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setYearFilter("all")}
            className="rounded-full text-xs h-8"
          >
            All Years
          </Button>
          {years.slice(0, 5).map(year => (
            <Button 
              key={year}
              variant={yearFilter === year ? "default" : "outline"}
              size="sm"
              onClick={() => setYearFilter(year)}
              className="rounded-full text-xs h-8"
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-6">
        {years.map((year) => {
          if (yearFilter !== "all" && yearFilter !== year) return null;
          
          const papers = papersByYear[Number(year)];
          
          return (
            <motion.div 
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-secondary/50 px-4 py-2 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-foreground">{year} Papers</h3>
                <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
                  {papers.length} Files
                </span>
              </div>
              
              <div className="divide-y divide-border">
                {papers.map((paper) => (
                  <div key={paper.id} className="p-4 flex items-center gap-3 hover:bg-secondary/20 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {paper.type}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className={
                          paper.medium === "English" ? "text-purple-600" :
                          paper.medium === "Sinhala" ? "text-amber-600" : 
                          paper.medium === "Tamil" ? "text-emerald-600" : "text-blue-600"
                        }>
                          {paper.medium} Medium
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {paper.linkType === 'external' ? (
                        <>
                          <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer" title="View Source">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                          <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer" title="Download Paper">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full text-primary bg-primary/10 hover:bg-primary/20">
                              <Download className="w-4 h-4" />
                            </Button>
                          </a>
                        </>
                      ) : (
                        <>
                          <Link href={`/paper/${paper.id}`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary" title="View Paper">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            className="h-8 w-8 rounded-full text-primary bg-primary/10 hover:bg-primary/20"
                            title="Download Mock Paper"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("This is a mock paper. Real download would start here.");
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </MobileShell>
  );
}
