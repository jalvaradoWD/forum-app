import { NextPage } from 'next';
import React from 'react';
import { ICategory } from '../../lib/interfaces/Categories';

const SubCategoryPage: NextPage<{ category: ICategory }> = ({ category }) => {
  return (
    <div>
      <h1 className="text-center text-5xl font-bold bg-purple-900 text-white py-4">
        {category.name}
        <p className="text-center text-xl">{category.id}</p>
      </h1>
      <ul className="flex flex-col gap-4 px-4 py-2">
        {category.Topic.map((topic) => (
          <li
            className="border-2 border-green-900 bg-green-100 p-2"
            key={topic.id}
          >
            <h2 className="text-2xl capitalize">{topic.title}</h2>
            <p>{topic.description}</p>
            <ul className="flex flex-row flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <li
                  className="bg-blue-600 w-fit p-1 rounded text-white text-sm font-bold"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/category/${id}`);
  const data: ICategory = await res.json();
  return {
    props: {
      category: data,
    },
  };
};

export default SubCategoryPage;
