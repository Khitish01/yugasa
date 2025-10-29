"use client"

import { useState, useEffect } from "react"
import { SectionPage } from "@/components/site/section-page"
import { SectionHero } from "@/components/site/section-hero"
import { Reveal } from "@/components/site/reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail } from "lucide-react"
import { getContent } from "@/lib/admin"

const leadership = [
  {
    name: "Rajesh Yugasa",
    role: "Founder & Managing Director",
    experience: "20+ Years",
    image: "/executive-portrait.png",
    bio: "Visionary leader with over two decades of experience in construction and real estate development. Led the company from a small firm to a recognized name in the industry.",
    specialization: "Strategic Planning, Business Development",
    education: "B.E. Civil Engineering, MBA"
  },
  {
    name: "Priya Sharma",
    role: "Chief Architect",
    experience: "15+ Years",
    image: "/placeholder-user.jpg",
    bio: "Award-winning architect known for innovative designs that blend functionality with aesthetic appeal. Leads our design team in creating exceptional spaces.",
    specialization: "Architectural Design, Sustainable Building",
    education: "B.Arch, M.Arch (Sustainable Design)"
  },
  {
    name: "Amit Kumar",
    role: "Head of Engineering",
    experience: "18+ Years",
    image: "/thoughtful-engineer.png",
    bio: "Structural engineering expert ensuring all projects meet the highest safety and quality standards. Oversees technical aspects of all constructions.",
    specialization: "Structural Engineering, Quality Control",
    education: "B.E. Civil, M.Tech Structural Engineering"
  }
]

const team = [
  {
    name: "Sneha Patel",
    role: "Project Manager",
    department: "Operations",
    experience: "8 Years",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Vikram Singh",
    role: "Site Supervisor",
    department: "Construction",
    experience: "12 Years",
    image: "/construction-manager.jpg"
  },
  {
    name: "Meera Joshi",
    role: "Interior Designer",
    department: "Design",
    experience: "6 Years",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Rohit Gupta",
    role: "Quality Inspector",
    department: "Quality Assurance",
    experience: "10 Years",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Kavya Reddy",
    role: "Client Relations Manager",
    department: "Customer Service",
    experience: "5 Years",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Arjun Nair",
    role: "Safety Officer",
    department: "Safety & Compliance",
    experience: "7 Years",
    image: "/placeholder-user.jpg"
  }
]

export default function TeamPage() {
  const [heroBackground, setHeroBackground] = useState("/team-meeting-architecture-studio.jpg")
  const [leadershipData, setLeadershipData] = useState(leadership)
  const [teamData, setTeamData] = useState(team)


  useEffect(() => {
    const loadTeamData = async () => {
      // Load hero background
      try {
        const response = await fetch('/api/data?key=team-hero-bg')
        if (response.ok) {
          const result = await response.json()
          if (result.data) {
            setHeroBackground(result.data)
          }
        }
      } catch (e) {
        console.error('Failed to load hero background:', e)
      }

      // Load leadership data
      try {
        const leadershipResponse = await fetch('/api/data?key=leadership-team')
        if (leadershipResponse.ok) {
          const leadershipResult = await leadershipResponse.json()
          if (leadershipResult.data && Array.isArray(leadershipResult.data)) {
            setLeadershipData(leadershipResult.data)
          }
        }
      } catch (e) {
        console.error('Failed to load leadership data:', e)
      }

      // Load team data
      try {
        const teamResponse = await fetch('/api/data?key=team-members')
        if (teamResponse.ok) {
          const teamResult = await teamResponse.json()
          if (teamResult.data && Array.isArray(teamResult.data)) {
            setTeamData(teamResult.data)
          }
        }
      } catch (e) {
        console.error('Failed to load team data:', e)
      }


    }

    loadTeamData()

    const handleStorageChange = () => {
      loadTeamData()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('teamHeroUpdated', handleStorageChange)
    window.addEventListener('leadershipUpdated', handleStorageChange)
    window.addEventListener('teamUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('teamHeroUpdated', handleStorageChange)
      window.removeEventListener('leadershipUpdated', handleStorageChange)
      window.removeEventListener('teamUpdated', handleStorageChange)
    }
  }, [])

  return (
    <>
      <SectionHero
        eyebrow="Our Team"
        title="Meet Our Team"
        subtitle="The passionate professionals behind every successful Yugasa project."
        imageSrc={heroBackground}
      />
      
      <SectionPage
        title="Leadership Team"
        description="Experienced leaders driving innovation and excellence in construction."
      >
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            {leadershipData.map((leader) => (
              <Card key={leader.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                    <p className="text-primary font-medium mb-2">{leader.position}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {leader.bio}
                  </p>
                  
                  <div className="flex gap-2">
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {leader.email && (
                      <a href={`mailto:${leader.email}`} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-8">
              Skilled professionals across all departments working together to deliver exceptional results.
            </p>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.map((member) => (
                <Card key={member.name} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-primary">{member.position}</p>
                        <p className="text-xs text-muted-foreground">{member.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Team Member</Badge>
                      <div className="flex gap-1">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors">
                            <Linkedin className="w-3 h-3" />
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors">
                            <Mail className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>

        {/* <Reveal>
          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for excellence in construction. 
              Explore career opportunities and become part of the Yugasa family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/careers" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View Open Positions
              </a>
              <a 
                href="mailto:careers@yugasa.builders" 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </Reveal> */}
      </SectionPage>
    </>
  )
}