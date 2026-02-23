import Image from "next/image";
import { Github, Twitter, Linkedin, Globe } from "lucide-react"; 

const TEAM = [
  {
    name: "Giles Greene",
    role: "Co-Founder & Editor",
    // 1. Using backticks (``) to allow physical line breaks in the code
    bio: `Focused on early-stage fintech and infrastructure. 

R&D Intern @ The Federal Reserve of Boston.
Incoming @ Capital One.
Previously @ Deutsche Bank.`, 
    image: "/Giles-Picture.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/gilesgreene/",
      github: "https://github.com/gilesgreene",
    },
  },
  {
    name: "Lucas Caicedo",
    role: "Co-Founder & Analyst",
    bio: `Specializing in Healthcare and Industrials. 

Incoming @ J.P. Morgan.`,
    image: "/friend-photo.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/l-caicedo/",
      globe: "#",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-vc-navy uppercase tracking-tighter">
          Who We Are
        </h1>
        <p className="max-w-2xl mx-auto text-vc-navy/60 font-medium italic">
          We built Venture Compass to demystify the flow of capital and provide a clear lens into the world of venture.
        </p>
        <div className="w-16 h-1 bg-vc-navy mx-auto opacity-20 rounded-full" />
      </section>

      {/* Partners Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {TEAM.map((member) => (
          <div key={member.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-vc-navy/5 mb-6 shadow-xl border border-vc-navy/5">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-vc-navy">{member.name}</h2>
                  <p className="text-[10px] font-bold text-vc-navy/40 uppercase tracking-[0.2em]">
                    {member.role}
                  </p>
                </div>
                
                <div className="flex gap-3 text-vc-navy/40"> 
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} className="hover:text-black transition-colors">
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* 2. Added 'whitespace-pre-line' so the browser respects the breaks above */}
              <p className="text-vc-navy/70 leading-relaxed text-sm whitespace-pre-line">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Mission / Context Section */}
      <section className="bg-white/40 backdrop-blur-sm border border-vc-navy/5 rounded-[2rem] p-8 md:p-12 text-center">
        <h3 className="text-xl font-serif font-bold text-vc-navy mb-4 italic">Our Mission</h3>
        <p className="text-vc-navy/60 max-w-xl mx-auto text-sm leading-loose">
          Venture Compass is a side project designed to bridge the gap between technical data and investment narrative. 
          By combining live signals with editorial deep-dives, we hope to navigate the noise together.
        </p>
      </section>
    </div>
  );
}