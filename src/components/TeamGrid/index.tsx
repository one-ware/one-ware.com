import React from "react";
import { TeamMember } from "../../data/teamData";

interface TeamGridProps {
  members: TeamMember[];
  title?: string;
}

export default function TeamGrid({ members, title }: TeamGridProps) {
  return (
    <div className="mt-20">
      {title && (
        <h2 className="text-gray-600 text-3xl md:text-4xl font-normal text-left mb-12">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {members.map((member, index) => (
          <div
            key={member.email}
            className="flex flex-col group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => window.location.href = `mailto:${member.email}`}
          >
            <div className="flex justify-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square max-w-40 rounded-full mb-4 object-cover transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg"
              />
            </div>
            <h3 className="text-gray-600 text-sm md:text-base font-normal mb-1 text-center transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]">
              {member.name}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-bold text-center mb-2">
              {member.role}
            </p>
            <div className="flex flex-col items-center gap-1">
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 text-xs hover:text-[var(--ifm-color-primary)] transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  LinkedIn
                </a>
              )}
              <a
                href={`mailto:${member.email}`}
                className="text-stone-400 text-xs hover:text-[var(--ifm-color-primary)] transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
