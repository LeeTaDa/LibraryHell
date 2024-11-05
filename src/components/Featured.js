import React from 'react';

function ResourceCard({ id, title, description }) {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="bg-white rounded shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Featured() {
  const resources = [
    {
      id: "digital-collections",
      title: "Digital Collections",
      description: "Explore our digital collections, including e-books, articles, and more.",
      details: "Our digital collections feature over 100,000 e-books, 50,000 academic journal articles, and a vast array of multimedia resources. Access these materials 24/7 from anywhere with your library card. Popular collections include our Historical Newspaper Archive, Scientific Journal Database, and Classic Literature E-book Series."
    },
    {
      id: "research-guides",
      title: "Research Guides",
      description: "Get help with your research, from finding sources to citing your work.",
      details: "Our research guides cover a wide range of topics and disciplines. Each guide is curated by expert librarians and includes recommended databases, key resources, and tips for effective research strategies. We offer guides for popular subjects like History, Biology, Computer Science, and Literature, as well as specialized topics like Data Visualization and Systematic Reviews."
    },
    {
      id: "study-spaces",
      title: "Study Spaces",
      description: "Find a quiet spot to study, collaborate with classmates, or work on a project.",
      details: "Our library offers a variety of study spaces to suit different needs. We have silent reading rooms, group study areas, and tech-enabled collaboration spaces. Features include adjustable lighting, ergonomic furniture, and power outlets at every seat. Book a private study room online or use our open spaces on a first-come, first-served basis."
    },
    {
      id: "library-hours",
      title: "Library Hours",
      description: "Open Monday-Friday: 8am-10pm, Saturday-Sunday: 10am-8pm",
      details: "Main Library Hours:\nMonday-Friday: 8am-10pm\nSaturday-Sunday: 10am-8pm\n\nSpecial Collections:\nMonday-Friday: 9am-5pm\nSaturday: 10am-4pm\nSunday: Closed\n\nNote: Hours may vary during holidays and exam periods. Check our website or call for the most up-to-date information."
    },
    {
      id: "meet-staff",
      title: "Meet Our Staff",
      description: "Our librarians are here to help! Visit the information desk or schedule a consultation.",
      details: "Our dedicated staff includes subject specialists, research librarians, and technology experts. Meet some of our team members:\n\n- Sarah Johnson, Head Librarian (specializes in Literature and History)\n- Dr. Michael Chen, Research Support Librarian (STEM focus)\n- Emily Rodriguez, Digital Resources Coordinator\n- Alex Kim, Information Technology Specialist\n\nSchedule a one-on-one consultation or visit the information desk for immediate assistance."
    }
  ];

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {resources.map(resource => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed information sections */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          {resources.map(resource => (
            <div key={resource.id} id={resource.id} className="mb-12">
              <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
              <p className="whitespace-pre-line">{resource.details}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Featured;
