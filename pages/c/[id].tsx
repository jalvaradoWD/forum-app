import { Drawer } from '@mui/material';
import { Category } from '@prisma/client';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { ICategory } from '../../lib/interfaces/Categories';

const SubCategoryPage: NextPage<{ category: ICategory }> = ({ category }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log(category);

  return (
    <div>
      <h1 className="text-center text-5xl font-bold bg-purple-900 text-white py-2">
        {category.name}
      </h1>
      <div className="flex flex-row justify-between m-4 bg-slate-800 text-white box-border">
        <div>
          <button className="p-3 bg-blue-300 text-black" type="button">
            Latest
          </button>
          <button className="p-3 bg-blue-300 text-black" type="button">
            New
          </button>
          <button className="p-3 bg-blue-300 text-black" type="button">
            Top
          </button>
        </div>
        <div>
          <button
            onClick={() => alert('New topic button clicked 💪')}
            className="p-3 bg-blue-300 text-black"
            type="button"
          >
            + New Topic
          </button>
        </div>
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}></Drawer>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/category/${id}`);
  const data: Category = await res.json();
  return {
    props: {
      category: data,
    },
  };
};

export default SubCategoryPage;
