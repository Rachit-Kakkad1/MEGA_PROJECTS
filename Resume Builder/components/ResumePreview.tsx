import React from 'react';
import { useResume } from '../context/ResumeContext';
import { MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resume } = useResume();
  const { profile, experience, education, skills } = resume;

  // A4 dimensions in Tailwind: w-[210mm] min-h-[297mm]
  // Standard margins: p-[15mm]
  
  return (
    <div className="print:w-full print:h-full print:absolute print:top-0 print:left-0 print:m-0">
      <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none p-[20mm] text-slate-900 font-serif leading-relaxed">
        
        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-2 text-slate-900 font-sans">
            {profile.firstName} {profile.lastName}
          </h1>
          <h2 className="text-lg text-slate-600 font-medium mb-3 uppercase tracking-wider font-sans">{resume.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-sans">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{profile.website}</span>
              </div>
            )}
             {profile.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <span>{profile.linkedin}</span>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {profile.summary && (
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2 font-sans tracking-wider text-slate-800">Professional Summary</h3>
            <p className="text-sm text-slate-800 text-justify">{profile.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 font-sans tracking-wider text-slate-800">Professional Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-md text-slate-900">{exp.position}</h4>
                    <span className="text-sm text-slate-600 font-sans">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-semibold text-sm text-slate-700 italic">{exp.company}</span>
                     <span className="text-xs text-slate-500 font-sans">{exp.location}</span>
                  </div>
                  <div className="text-sm text-slate-800 pl-4">
                    <ul className="list-disc space-y-1 marker:text-slate-400">
                      {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                         <li key={i} dangerouslySetInnerHTML={{ __html: line.replace(/^•\s*/, '') }}></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 font-sans tracking-wider text-slate-800">Education</h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-slate-900">{edu.institution}</h4>
                    <span className="text-sm text-slate-600 font-sans">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-slate-800">
                    <span className="italic">{edu.degree}</span>, {edu.fieldOfStudy}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 font-sans tracking-wider text-slate-800">Technical Skills</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              {skills.map((skill) => (
                <React.Fragment key={skill.id}>
                  <span className="font-bold text-slate-900 whitespace-nowrap">{skill.category}:</span>
                  <span className="text-slate-800">{skill.items}</span>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
