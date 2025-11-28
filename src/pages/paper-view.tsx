import { useRoute, Link } from "wouter";
import { ArrowLeft, Download, Share2, MoreVertical, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SUBJECTS } from "@/lib/mockData";

export default function PaperView() {
  const [, params] = useRoute("/paper/:id");
  const paperId = params?.id;
  
  // Find paper details (inefficient but fine for mock)
  let paperDetails = null;
  let subjectDetails = null;
  
  if (paperId) {
    for (const subject of SUBJECTS) {
      const paper = subject.papers.find(p => p.id === paperId);
      if (paper) {
        paperDetails = paper;
        subjectDetails = subject;
        break;
      }
    }
  }

  if (!paperDetails || !subjectDetails) {
    return <div>Paper not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card z-10">
        <Link href={`/subjects/${subjectDetails.id}`}>
          <Button variant="ghost" size="icon" className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="text-center">
          <h1 className="font-bold text-sm">{subjectDetails.name} {paperDetails.year}</h1>
          <p className="text-[10px] text-muted-foreground">{paperDetails.type} • {paperDetails.medium} Medium</p>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* PDF Mock Viewer */}
      <div className="flex-1 bg-secondary/30 overflow-y-auto p-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-lg min-h-[800px] rounded-sm p-8 text-black">
          {/* Mock Paper Content */}
          <div className="border-b-2 border-black pb-4 mb-8 text-center">
            <h2 className="uppercase font-bold text-xl tracking-wider mb-2">
              General Certificate of Education (Ord. Level) Examination, {paperDetails.year}
            </h2>
            <h3 className="text-2xl font-bold uppercase my-4">{subjectDetails.name} I</h3>
            <div className="flex justify-between text-sm font-medium mt-8 px-8">
              <span>Time: One Hour</span>
              <span>Total Marks: 100</span>
            </div>
          </div>

          <div className="space-y-8 font-serif">
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
              <strong>Instructions:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Answer all questions.</li>
                <li>In each of the questions 1 to 40, pick one of the alternatives (1), (2), (3), (4) which is correct or most appropriate.</li>
                <li>Use a calculator is not permitted.</li>
              </ul>
            </div>

            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="mb-6">
                <div className="flex gap-4 mb-3">
                  <span className="font-bold">{num}.</span>
                  <p>This is a sample question text for the {subjectDetails?.name} paper. It would contain the actual question content from the {paperDetails?.year} past paper.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pl-8">
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs">(1)</div>
                    <span>Answer Option A</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs">(2)</div>
                    <span>Answer Option B</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs">(3)</div>
                    <span>Answer Option C</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs">(4)</div>
                    <span>Answer Option D</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-gray-400 text-sm">
             -- End of Page 1 --
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-16 bg-card border-t border-border p-4 flex items-center gap-4">
        <Button className="flex-1 rounded-full font-bold shadow-lg shadow-primary/20">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 shrink-0">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
