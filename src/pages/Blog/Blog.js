import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import './Blog.css'

const Blog = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`https://car-dealer-zone-server.vercel.app/blogs`)
      const data = await res.json()
      return data
    }
  })
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='w-full'>
            <h2 className='text-4xl font-bold text-center'>Our Blog</h2>
          </div>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className='py-5'>
            <div className="grid grid-cols-12 gap-5">
              {blogs.map(blog =>
                <div className="col-span-12" key={blog._id}>
                  <div className="w-full overflow-hidden relative  bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="px-10 py-10">
                      <h1 className="text-3xl font-bold text-[#f06425] dark:text-white pb-5">{blog?.title}</h1>
                      <div className='blog-details font-base' dangerouslySetInnerHTML={{ __html: blog?.details }}></div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blog;