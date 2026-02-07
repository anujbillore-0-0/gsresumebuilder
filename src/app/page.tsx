"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Layout,
  User,
  GraduationCap,
  Award,
  Briefcase,
  FileCode,
  Globe,
  BookOpen,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// --- Types ---

interface Education {
  board: string;
  institute: string;
  year: string;
  cgpa: string;
}

interface WorkExperience {
  id: string;
  company: string;
  period: string;
  bullets: string[];
}

interface Project {
  id: string;
  name: string;
  period: string;
  bullets: string[];
}

interface PositionOfResponsibility {
  id: string;
  title: string;
  period: string;
  bullets: string[];
}

interface ResumeData {
  header: {
    name: string;
    ugYear: string;
    college: string;
    dob: string;
    email: string;
    enrollmentNo: string;
    department: string;
    gender: string;
    specialization: string;
    mobile: string;
  };
  education: {
    graduation: Education;
    twelfth: Education;
    tenth: Education;
  };
  scholasticAchievements: string[];
  workExperience: WorkExperience[];
  projects: Project[];
  platformsWorked: {
    operatingSystems: string;
    programmingSkills: string;
    webDesigning: string;
    softwareSkills: string;
  };
  coursesUndertaken: {
    core: string[];
    breadth: string[];
  };
  positionsOfResponsibility: PositionOfResponsibility[];
}

// --- Initial Data ---

const initialData: ResumeData = {
  header: {
    name: "Anuj Billore",
    ugYear: "UG 3rd Year",
    college: "SGSITS, Indore",
    dob: "2005-07-31",
    email: "anujbillore3107@gmail.com",
    enrollmentNo: "0801CS231026",
    department: "Computer Science",
    gender: "Male",
    specialization: "None",
    mobile: "+91 8319597918",
  },
  education: {
    graduation: { board: "RGPV, Bhopal", institute: "SGSITS, Indore", year: "2027", cgpa: "7.75" },
    twelfth: { board: "CBSE", institute: "St. Mary’s CO-ED School, Harda, M.P.", year: "2023", cgpa: "92.2" },
    tenth: { board: "CBSE", institute: "St. Mary’s CO-ED School, Harda, M.P.", year: "2021", cgpa: "94.8" },
  },
  scholasticAchievements: [
    "Secured 98.56 percentile (AIR 32,511) in JEE Mains 2023 among 1.3 million candidates.",
    "Selected into top 25 teams among 5000+ teams Nationwide in Truth Tell Hackathon.",
    "Organized Mini Ministry of Information and Broadcasting, India.",
    "Brown (7.2) Matty at 4 Coder.",
  ],
  workExperience: [
    {
      id: "1",
      company: "Infosys India Pvt. Ltd.",
      period: "Sept 2025 – Nov 2025",
      bullets: [
        "Selected for Batch 4 of Infosys Springboard Internship.",
        "Worked on data visualization tools and a dedicated project.",
      ],
    },
    {
      id: "2",
      company: "Aastha Old Age Home",
      period: "Dec 2024 – Jan 2025",
      bullets: [
        "Interned at an NGO focused on elderly care.",
        "Gained insights into healthcare and social work practices.",
      ],
    },
  ],
  projects: [
    {
      id: "1",
      name: "ETL Pipeline",
      period: "Jan 2025",
      bullets: [
        "Built a cricket statistics pipeline using Google Cloud Services for end-to-end data processing and visualization.",
        "Used Python to fetch cricket data from the Cricbuzz API and store it in Google Cloud Storage (GCS).",
        "Implemented a Cloud Function to trigger a Dataflow job for processing and loading data into BigQuery.",
        "Visualized key insights on Looker Studio.",
      ],
    },
    {
      id: "2",
      name: "TruthTrack",
      period: "Nov 2024 – Jan 2025",
      bullets: [
        "Built a news analysis system that predicts primary topics and detects misinformation trends.",
        "Used Flask for backend and HTML/CSS/JavaScript for frontend.",
        "Deployed the application on Render and integrated a custom search API.",
      ],
    },
  ],
  platformsWorked: {
    operatingSystems: "Windows, Linux, Android",
    programmingSkills: "C++, Java, SQL, Python, Data Structures, Algorithms, Selenium, Tkinter, BeautifulSoup",
    webDesigning: "Full stack Development, HTML, CSS, Javascript, Flask, Vercel, Basic UI/UX",
    softwareSkills: "GCP, Jira/Clickup, Scrum, Agile Methodologies, VS Code, Jupyter Notebook",
  },
  coursesUndertaken: {
    core: ["Data Structures", "Object Oriented Programming", "Computer Architecture", "Agile Methodologies", "Mobile App Development"],
    breadth: ["Design & Analysis of Algorithms", "Web Development", "ETL Pipelines", "Scrum Framework", "Web Scraping", "Backend Development"],
  },
  positionsOfResponsibility: [
    {
      id: "1",
      title: "Video & Media Coordinator",
      period: "April 2024 – Present",
      bullets: [
        "Served as Video Coordinator at Club Ojasiya in my University.",
        "Designed promotional videos using Adobe After Effects and DaVinci Resolve.",
        "Contributed to planning, coordination, and execution of college fests and functions.",
      ],
    },
  ],
};

// --- Helper Functions ---

const escapeLatex = (str: string) => {
  return str
    .replace(/\\/g, "\\textbackslash ")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\^/g, "\\textasciicircum ")
    .replace(/~/g, "\\textasciitilde ");
};

const generateLatex = (data: ResumeData) => {
  const header = `
% -------- HEADER WITH LOGO AND DETAILS (ALL BOLD) --------
\\begin{minipage}{0.18\\textwidth}
    \\includegraphics[width=2.2cm]{college_logo.png}
\\end{minipage}
\\hfill
\\begin{minipage}{0.38\\textwidth}
\\raggedright
{\\Large \\textbf{${escapeLatex(data.header.name)}}}\\\\
\\textbf{${escapeLatex(data.header.ugYear)}}\\\\
\\textbf{${escapeLatex(data.header.college)}}\\\\
\\textbf{D.O.B : ${escapeLatex(data.header.dob)}}\\\\
\\textbf{Email ID : \\href{mailto:${data.header.email}}{${escapeLatex(data.header.email)}}}
\\end{minipage}
\\hfill
\\begin{minipage}{0.38\\textwidth}
\\raggedright
\\textbf{Enrollment No.: ${escapeLatex(data.header.enrollmentNo)}}\\\\
\\textbf{Department : ${escapeLatex(data.header.department)}}\\\\
\\textbf{Gender : ${escapeLatex(data.header.gender)}}\\\\
\\textbf{Specialization : ${escapeLatex(data.header.specialization)}}\\\\
\\textbf{Mobile \\# : ${escapeLatex(data.header.mobile)}}
\\end{minipage}

\\vspace{10pt}
`;


  const education = `
\\startSection{Education}

\\noindent
\\parbox[t]{3.2cm}{\\raggedright \\textbf{Degree / Certificate}} \\hfill
\\parbox[t]{3.2cm}{\\raggedright \\textbf{University / Board}} \\hfill
\\parbox[t]{4.5cm}{\\raggedright \\textbf{Institute / School}} \\hfill
\\parbox[t]{2.6cm}{\\raggedright \\textbf{Year of Passing}} \\hfill
\\parbox[t]{2.5cm}{\\raggedright \\textbf{CGPA / Percentage}}

\\noindent\\hrulefill

\\noindent
\\parbox[t]{3.2cm}{Graduation} \\hfill
\\parbox[t]{3.2cm}{${escapeLatex(data.education.graduation.board)}} \\hfill
\\parbox[t]{4.5cm}{${escapeLatex(data.education.graduation.institute)}} \\hfill
\\parbox[t]{2.6cm}{${escapeLatex(data.education.graduation.year)}} \\hfill
\\parbox[t]{2.5cm}{${escapeLatex(data.education.graduation.cgpa)}}

\\noindent\\hrulefill

\\noindent
\\parbox[t]{3.2cm}{12th} \\hfill
\\parbox[t]{3.2cm}{${escapeLatex(data.education.twelfth.board)}} \\hfill
\\parbox[t]{4.5cm}{${escapeLatex(data.education.twelfth.institute)}} \\hfill
\\parbox[t]{2.6cm}{${escapeLatex(data.education.twelfth.year)}} \\hfill
\\parbox[t]{2.5cm}{${escapeLatex(data.education.twelfth.cgpa)}}

\\noindent\\hrulefill

\\noindent
\\parbox[t]{3.2cm}{10th} \\hfill
\\parbox[t]{3.2cm}{${escapeLatex(data.education.tenth.board)}} \\hfill
\\parbox[t]{4.5cm}{${escapeLatex(data.education.tenth.institute)}} \\hfill
\\parbox[t]{2.6cm}{${escapeLatex(data.education.tenth.year)}} \\hfill
\\parbox[t]{2.5cm}{${escapeLatex(data.education.tenth.cgpa)}}

\\noindent\\hrulefill
\\vspace{6pt}
`;

  const scholasticAchievements = `
\\startSection{Scholastic Achievements}
\\begin{itemize}
${data.scholasticAchievements.map(item => `    \\item ${escapeLatex(item)}`).join("\n")}
\\end{itemize}
`;

  const workExperience = `
\\startSection{Work Experience}
${data.workExperience.map(exp => `
\\textbf{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.period)}  
\\begin{itemize}
${exp.bullets.map(b => `    \\item ${escapeLatex(b)}`).join("\n")}
\\end{itemize}
`).join("\n")}
`;

  const projects = `
\\section*{Projects}
\\newlength{\\projtext}
\\setlength{\\projtext}{0.72\\textwidth}

${data.projects.map(proj => `
\\noindent
\\textbf{${escapeLatex(proj.name)}} \\hfill \\text{${escapeLatex(proj.period)}}

\\begin{itemize}
${proj.bullets.map(b => `
\\item \\parbox[t]{\\projtext}{\\raggedright
${escapeLatex(b)}}`).join("\n")}
\\end{itemize}
\\vspace{6pt}
`).join("\n")}
`;

  const platformsWorked = `
\\startSection{Platforms Worked}

\\begin{itemize}
    \\item \\textbf{Operating Systems} : ${escapeLatex(data.platformsWorked.operatingSystems)}
    \\item \\textbf{Programming Skills} : ${escapeLatex(data.platformsWorked.programmingSkills)}
    \\item \\textbf{Web Designing} : ${escapeLatex(data.platformsWorked.webDesigning)}
    \\item \\textbf{Software Skills} : ${escapeLatex(data.platformsWorked.softwareSkills)}
\\end{itemize}

\\vspace{6pt}
`;

  const coursesUndertaken = `
\\startSection{Courses Undertaken}

\\noindent
\\begin{tabular}{p{0.48\\textwidth} p{0.48\\textwidth}}

\\textbf{Core} &
\\textbf{Breadth} \\\\

\\begin{itemize}
${data.coursesUndertaken.core.map(c => `    \\item ${escapeLatex(c)}`).join("\n")}
\\end{itemize}
&
\\begin{itemize}
${data.coursesUndertaken.breadth.map(b => `    \\item ${escapeLatex(b)}`).join("\n")}
\\end{itemize}
\\\\

\\end{tabular}

\\vspace{6pt}
`;

  const positionsOfResponsibility = `
\\startSection{Positions of Responsibility}

${data.positionsOfResponsibility.map(por => `
\\textbf{${escapeLatex(por.title)}} \\hfill ${escapeLatex(por.period)}

\\begin{itemize}
${por.bullets.map(b => `    \\item ${escapeLatex(b)}`).join("\n")}
\\end{itemize}
`).join("\n")}
`;

  return `\\documentclass[a4paper,10pt]{article}
\\usepackage[left=0.7in,right=0.7in,top=0.6in,bottom=0.6in]{geometry}
\\usepackage{graphicx}
\\usepackage{array}
\\usepackage{booktabs}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{multicol}
\\usepackage{needspace}

\\newcommand{\\startSection}[1]{%
  \\needspace{5\\baselineskip}%
  \\section*{#1}%
}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]

\\setlength{\\parindent}{0pt}
\\setlength{\\tabcolsep}{6pt}
\\setlist{nosep}

\\begin{document}
${header}
${education}
${scholasticAchievements}
${workExperience}
${projects}
${platformsWorked}
${coursesUndertaken}
${positionsOfResponsibility}
\\end{document}`;
};

// --- Components ---

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [latex, setLatex] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLatex(generateLatex(data));
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    toast.success("LaTeX copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const updateHeader = (field: keyof ResumeData["header"], value: string) => {
    setData((prev) => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }));
  };

  const updateEducation = (type: keyof ResumeData["education"], field: keyof Education, value: string) => {
    setData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [type]: { ...prev.education[type], [field]: value },
      },
    }));
  };

  const addAchievement = () => {
    setData((prev) => ({
      ...prev,
      scholasticAchievements: [...prev.scholasticAchievements, ""],
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setData((prev) => {
      const newAchievements = [...prev.scholasticAchievements];
      newAchievements[index] = value;
      return { ...prev, scholasticAchievements: newAchievements };
    });
  };

  const removeAchievement = (index: number) => {
    setData((prev) => ({
      ...prev,
      scholasticAchievements: prev.scholasticAchievements.filter((_, i) => i !== index),
    }));
  };

  const addWorkExperience = () => {
    setData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { id: Math.random().toString(36).substr(2, 9), company: "", period: "", bullets: [""] },
      ],
    }));
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: any) => {
    setData((prev) => {
      const newWork = [...prev.workExperience];
      newWork[index] = { ...newWork[index], [field]: value };
      return { ...prev, workExperience: newWork };
    });
  };

  const removeWorkExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Math.random().toString(36).substr(2, 9), name: "", period: "", bullets: [""] },
      ],
    }));
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addPOR = () => {
    setData((prev) => ({
      ...prev,
      positionsOfResponsibility: [
        ...prev.positionsOfResponsibility,
        { id: Math.random().toString(36).substr(2, 9), title: "", period: "", bullets: [""] },
      ],
    }));
  };

  const updatePOR = (index: number, field: keyof PositionOfResponsibility, value: any) => {
    setData((prev) => {
      const newPOR = [...prev.positionsOfResponsibility];
      newPOR[index] = { ...newPOR[index], [field]: value };
      return { ...prev, positionsOfResponsibility: newPOR };
    });
  };

  const removePOR = (index: number) => {
    setData((prev) => ({
      ...prev,
      positionsOfResponsibility: prev.positionsOfResponsibility.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950">
      {/* Left Side: Editor */}
      <div className="w-1/2 flex flex-col border-r border-zinc-200 dark:border-zinc-800">
        <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">Resume Builder</h1>
          </div>
          <Button onClick={handleCopy} variant="outline" size="sm" className="gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy LaTeX
          </Button>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-8 pb-20">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <User className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Header Information</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={data.header.name} onChange={(e) => updateHeader("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>UG Year</Label>
                  <Input value={data.header.ugYear} onChange={(e) => updateHeader("ugYear", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>College</Label>
                  <Input value={data.header.college} onChange={(e) => updateHeader("college", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input value={data.header.dob} onChange={(e) => updateHeader("dob", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={data.header.email} onChange={(e) => updateHeader("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Enrollment No.</Label>
                  <Input value={data.header.enrollmentNo} onChange={(e) => updateHeader("enrollmentNo", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={data.header.department} onChange={(e) => updateHeader("department", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Input value={data.header.gender} onChange={(e) => updateHeader("gender", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input value={data.header.specialization} onChange={(e) => updateHeader("specialization", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input value={data.header.mobile} onChange={(e) => updateHeader("mobile", e.target.value)} />
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <GraduationCap className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Education</h2>
              </div>
              {Object.entries(data.education).map(([key, edu]) => (
                <Card key={key}>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">University/Board</Label>
                      <Input value={edu.board} onChange={(e) => updateEducation(key as any, "board", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Institute/School</Label>
                      <Input value={edu.institute} onChange={(e) => updateEducation(key as any, "institute", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Year of Passing</Label>
                      <Input value={edu.year} onChange={(e) => updateEducation(key as any, "year", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">CGPA/Percentage</Label>
                      <Input value={edu.cgpa} onChange={(e) => updateEducation(key as any, "cgpa", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Achievements */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Award className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Scholastic Achievements</h2>
                </div>
                <Button onClick={addAchievement} variant="ghost" size="sm" className="h-8 px-2">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {data.scholasticAchievements.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={item} onChange={(e) => updateAchievement(i, e.target.value)} />
                    <Button onClick={() => removeAchievement(i)} variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Work Experience */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Briefcase className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Work Experience</h2>
                </div>
                <Button onClick={addWorkExperience} variant="ghost" size="sm" className="h-8 px-2">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {data.workExperience.map((exp, i) => (
                <Card key={exp.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Company Name</Label>
                        <Input value={exp.company} onChange={(e) => updateWorkExperience(i, "company", e.target.value)} />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label>Period</Label>
                        <Input value={exp.period} onChange={(e) => updateWorkExperience(i, "period", e.target.value)} />
                      </div>
                      <Button onClick={() => removeWorkExperience(i)} variant="ghost" size="icon" className="mt-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Bullets</Label>
                      {exp.bullets.map((bullet, bi) => (
                        <div key={bi} className="flex gap-2">
                          <Input 
                            value={bullet} 
                            onChange={(e) => {
                              const newBullets = [...exp.bullets];
                              newBullets[bi] = e.target.value;
                              updateWorkExperience(i, "bullets", newBullets);
                            }} 
                          />
                          <Button 
                            onClick={() => {
                              const newBullets = exp.bullets.filter((_, idx) => idx !== bi);
                              updateWorkExperience(i, "bullets", newBullets);
                            }} 
                            variant="ghost" 
                            size="icon"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        onClick={() => updateWorkExperience(i, "bullets", [...exp.bullets, ""])} 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        Add Bullet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Projects */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <FileCode className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Projects</h2>
                </div>
                <Button onClick={addProject} variant="ghost" size="sm" className="h-8 px-2">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {data.projects.map((proj, i) => (
                <Card key={proj.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Project Name</Label>
                        <Input value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label>Period</Label>
                        <Input value={proj.period} onChange={(e) => updateProject(i, "period", e.target.value)} />
                      </div>
                      <Button onClick={() => removeProject(i)} variant="ghost" size="icon" className="mt-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Bullets</Label>
                      {proj.bullets.map((bullet, bi) => (
                        <div key={bi} className="flex gap-2">
                          <Input 
                            value={bullet} 
                            onChange={(e) => {
                              const newBullets = [...proj.bullets];
                              newBullets[bi] = e.target.value;
                              updateProject(i, "bullets", newBullets);
                            }} 
                          />
                          <Button 
                            onClick={() => {
                              const newBullets = proj.bullets.filter((_, idx) => idx !== bi);
                              updateProject(i, "bullets", newBullets);
                            }} 
                            variant="ghost" 
                            size="icon"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        onClick={() => updateProject(i, "bullets", [...proj.bullets, ""])} 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        Add Bullet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Platforms Worked */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <Globe className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Platforms Worked</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Operating Systems</Label>
                  <Input 
                    value={data.platformsWorked.operatingSystems} 
                    onChange={(e) => setData(prev => ({ ...prev, platformsWorked: { ...prev.platformsWorked, operatingSystems: e.target.value } }))} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Programming Skills</Label>
                  <Textarea 
                    value={data.platformsWorked.programmingSkills} 
                    onChange={(e) => setData(prev => ({ ...prev, platformsWorked: { ...prev.platformsWorked, programmingSkills: e.target.value } }))} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Web Designing</Label>
                  <Textarea 
                    value={data.platformsWorked.webDesigning} 
                    onChange={(e) => setData(prev => ({ ...prev, platformsWorked: { ...prev.platformsWorked, webDesigning: e.target.value } }))} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Software Skills</Label>
                  <Textarea 
                    value={data.platformsWorked.softwareSkills} 
                    onChange={(e) => setData(prev => ({ ...prev, platformsWorked: { ...prev.platformsWorked, softwareSkills: e.target.value } }))} 
                  />
                </div>
              </div>
            </section>

            {/* Courses Undertaken */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <BookOpen className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Courses Undertaken</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label>Core</Label>
                  {data.coursesUndertaken.core.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input 
                        value={item} 
                        onChange={(e) => {
                          const newCore = [...data.coursesUndertaken.core];
                          newCore[i] = e.target.value;
                          setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, core: newCore } }));
                        }} 
                      />
                      <Button 
                        onClick={() => {
                          const newCore = data.coursesUndertaken.core.filter((_, idx) => idx !== i);
                          setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, core: newCore } }));
                        }} 
                        variant="ghost" 
                        size="icon"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    onClick={() => setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, core: [...prev.coursesUndertaken.core, ""] } }))} 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Add Core
                  </Button>
                </div>
                <div className="space-y-4">
                  <Label>Breadth</Label>
                  {data.coursesUndertaken.breadth.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input 
                        value={item} 
                        onChange={(e) => {
                          const newBreadth = [...data.coursesUndertaken.breadth];
                          newBreadth[i] = e.target.value;
                          setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, breadth: newBreadth } }));
                        }} 
                      />
                      <Button 
                        onClick={() => {
                          const newBreadth = data.coursesUndertaken.breadth.filter((_, idx) => idx !== i);
                          setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, breadth: newBreadth } }));
                        }} 
                        variant="ghost" 
                        size="icon"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    onClick={() => setData(prev => ({ ...prev, coursesUndertaken: { ...prev.coursesUndertaken, breadth: [...prev.coursesUndertaken.breadth, ""] } }))} 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Add Breadth
                  </Button>
                </div>
              </div>
            </section>

            {/* POR Section */}
            <section className="space-y-4 pb-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Positions of Responsibility</h2>
                </div>
                <Button onClick={addPOR} variant="ghost" size="sm" className="h-8 px-2">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {data.positionsOfResponsibility.map((por, i) => (
                <Card key={por.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Position Title</Label>
                        <Input value={por.title} onChange={(e) => updatePOR(i, "title", e.target.value)} />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label>Period</Label>
                        <Input value={por.period} onChange={(e) => updatePOR(i, "period", e.target.value)} />
                      </div>
                      <Button onClick={() => removePOR(i)} variant="ghost" size="icon" className="mt-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Bullets</Label>
                      {por.bullets.map((bullet, bi) => (
                        <div key={bi} className="flex gap-2">
                          <Input 
                            value={bullet} 
                            onChange={(e) => {
                              const newBullets = [...por.bullets];
                              newBullets[bi] = e.target.value;
                              updatePOR(i, "bullets", newBullets);
                            }} 
                          />
                          <Button 
                            onClick={() => {
                              const newBullets = por.bullets.filter((_, idx) => idx !== bi);
                              updatePOR(i, "bullets", newBullets);
                            }} 
                            variant="ghost" 
                            size="icon"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        onClick={() => updatePOR(i, "bullets", [...por.bullets, ""])} 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        Add Bullet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </ScrollArea>
      </div>

      {/* Right Side: Preview */}
      <div className="w-1/2 flex flex-col bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <header className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="latex">LaTeX Code</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button size="sm" variant="default" className="gap-2" onClick={() => {
                const blob = new Blob([latex], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "resume.tex";
                a.click();
              }}>
                <Download className="w-4 h-4" />
                Download .tex
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-8">
            <TabsContent value="preview" className="m-0 h-full">
              <div className="bg-white dark:bg-white text-black shadow-2xl mx-auto w-[21cm] min-h-[29.7cm] p-[0.7in] font-serif leading-tight">
                {/* Header Preview */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-[18%]">
                    <div className="w-[2.2cm] h-[2.2cm] border-2 border-dashed border-zinc-300 flex items-center justify-center text-[8px] text-zinc-400 text-center">
                      LOGO
                    </div>
                  </div>
                  <div className="w-[38%] text-left">
                    <h1 className="text-xl font-bold leading-tight uppercase">{data.header.name}</h1>
                    <div className="font-bold text-[10pt] leading-snug">
                      <p>{data.header.ugYear}</p>
                      <p>{data.header.college}</p>
                      <p>D.O.B : {data.header.dob}</p>
                      <p>Email ID : <span className="text-blue-600 underline">{data.header.email}</span></p>
                    </div>
                  </div>
                  <div className="w-[38%] text-left font-bold text-[10pt] leading-snug">
                    <p>Enrollment No.: {data.header.enrollmentNo}</p>
                    <p>Department : {data.header.department}</p>
                    <p>Gender : {data.header.gender}</p>
                    <p>Specialization : {data.header.specialization}</p>
                    <p>Mobile # : {data.header.mobile}</p>
                  </div>
                </div>

                {/* Education Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Education</h2>
                  <div className="w-full text-[10pt]">
                    <div className="flex font-bold border-b border-zinc-200 pb-1 mb-1">
                      <div className="w-[3.2cm]">Degree / Certificate</div>
                      <div className="w-[3.2cm]">University / Board</div>
                      <div className="w-[4.5cm]">Institute / School</div>
                      <div className="w-[2.6cm]">Year</div>
                      <div className="w-[2.5cm] text-right">CGPA/%</div>
                    </div>
                    {Object.entries(data.education).map(([key, edu]) => (
                      <div key={key} className="flex border-b border-zinc-100 py-1">
                        <div className="w-[3.2cm] capitalize">{key === 'twelfth' ? '12th' : key === 'tenth' ? '10th' : 'Graduation'}</div>
                        <div className="w-[3.2cm]">{edu.board}</div>
                        <div className="w-[4.5cm]">{edu.institute}</div>
                        <div className="w-[2.6cm]">{edu.year}</div>
                        <div className="w-[2.5cm] text-right">{edu.cgpa}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Scholastic Achievements</h2>
                  <ul className="list-disc list-inside text-[10pt] space-y-0.5">
                    {data.scholasticAchievements.map((item, i) => item && (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Work Experience Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Work Experience</h2>
                  <div className="space-y-3">
                    {data.workExperience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between font-bold text-[10pt]">
                          <span>{exp.company}</span>
                          <span>{exp.period}</span>
                        </div>
                        <ul className="list-disc list-inside text-[10pt] pl-4 space-y-0.5">
                          {exp.bullets.map((b, bi) => b && (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Projects</h2>
                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between font-bold text-[10pt]">
                          <span>{proj.name}</span>
                          <span>{proj.period}</span>
                        </div>
                        <ul className="list-disc text-[10pt] pl-5 space-y-0.5">
                          {proj.bullets.map((b, bi) => b && (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platforms Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Platforms Worked</h2>
                  <ul className="text-[10pt] space-y-1">
                    <li><strong>Operating Systems</strong> : {data.platformsWorked.operatingSystems}</li>
                    <li><strong>Programming Skills</strong> : {data.platformsWorked.programmingSkills}</li>
                    <li><strong>Web Designing</strong> : {data.platformsWorked.webDesigning}</li>
                    <li><strong>Software Skills</strong> : {data.platformsWorked.softwareSkills}</li>
                  </ul>
                </div>

                {/* Courses Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Courses Undertaken</h2>
                  <div className="flex text-[10pt]">
                    <div className="w-1/2">
                      <p className="font-bold">Core</p>
                      <ul className="list-disc list-inside pl-2">
                        {data.coursesUndertaken.core.map((c, i) => c && <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                    <div className="w-1/2">
                      <p className="font-bold">Breadth</p>
                      <ul className="list-disc list-inside pl-2">
                        {data.coursesUndertaken.breadth.map((b, i) => b && <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* POR Preview */}
                <div className="mt-4">
                  <h2 className="text-[11pt] font-bold border-b border-black uppercase tracking-wide pb-0.5 mb-2">Positions of Responsibility</h2>
                  <div className="space-y-3">
                    {data.positionsOfResponsibility.map((por) => (
                      <div key={por.id}>
                        <div className="flex justify-between font-bold text-[10pt]">
                          <span>{por.title}</span>
                          <span>{por.period}</span>
                        </div>
                        <ul className="list-disc list-inside text-[10pt] pl-4 space-y-0.5">
                          {por.bullets.map((b, bi) => b && (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="latex" className="m-0 h-full">
              <div className="relative h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800">
                <div className="absolute top-2 right-2 flex gap-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="p-6 h-full font-mono text-xs text-zinc-300 overflow-auto whitespace-pre-wrap">
                  {latex}
                </pre>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
