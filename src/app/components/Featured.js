import React from 'react';

function Featured() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Featured Resources
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded shadow-md p-4">
              <h3 className="text-lg font-bold mb-2">
                Digital Collections
              </h3>
              <p className="text-gray-600">
                Explore our digital collections, including e-books, articles, and more.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded shadow-md p-4">
              <h3 className="text-lg font-bold mb-2">
                Research Guides
              </h3>
              <p className="text-gray-600">
                Get help with your research, from finding sources to citing your work.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded shadow-md p-4">
              <h3 className="text-lg font-bold mb-2">
                Study Spaces
              </h3>
              <p className="text-gray-600">
                Find a quiet spot to study, collaborate with classmates, or work on a project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;