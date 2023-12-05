import React from "react";

const Content: React.FC = () => {
  return (
    <main className='ml-64 p-8'>
      <div className='border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
        <h2 className='text-xl font-semibold mb-4'>Main Content</h2>
        <p className='text-gray-600 dark:text-gray-300'>
          This is the main content area. You can put your content here, like
          articles, posts, or any other relevant information.
        </p>
      </div>
    </main>
  );
};

export default Content;
