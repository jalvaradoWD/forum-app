import { Drawer } from '@mui/material';
import { Category, Topic } from '@prisma/client';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { ICategory } from '../../lib/interfaces/Categories';

interface ITopicFormData {
  title: string | undefined;
  description: string | undefined;
}

const SubCategoryPage: NextPage<{ category: ICategory }> = ({ category }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topicFormData, setTopicFormData] = useState<ITopicFormData>({
    title: '',
    description: '',
  });
  const { data: session } = useSession();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();

    setTopicFormData({ ...topicFormData, [e.target.name]: e.target.value });
  };

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
        {session?.user ? (
          <div>
            <button
              onClick={() => {
                setDrawerOpen(true);
              }}
              className="p-3 bg-blue-300 text-black"
              type="button"
            >
              + New Topic
            </button>
          </div>
        ) : null}
      </div>
      <ul className="m-4 flex flex-col gap-2">
        {category.Topic.map((topic) => {
          return (
            <li key={topic.id} className="border-2 border-green-600 p-4">
              <h2 className="text-xl">{topic.title}</h2>
              <p>{topic.description}</p>
            </li>
          );
        })}
      </ul>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="bottom"
      >
        <form className="m-4 flex flex-col border-gray-500 border-2 p-2">
          <label htmlFor="title">Title</label>
          <input
            className="border-2 border-gray-300"
            type="text"
            id="title"
            name="title"
            onChange={onChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={onChange}
            className="border-2 border-gray-300"
            id="description"
          />
          <div className="flex flex-row gap-2 mt-2">
            <button
              className="p-2 bg-blue-500 text-white rounded"
              type="button"
              title="Create Topic"
              onClick={async () => {
                // Creating a topic for the category

                if (!session?.user) return new Error('Not logged in');

                const topicData = {
                  title: topicFormData.title,
                  description: topicFormData.description,
                  categoryId: category.id,
                };

                const res = await axios.post('/api/topic/create', topicData);

                if (res.status !== 200)
                  throw new Error("Topic couldn't be created");

                setTopicFormData({ title: '', description: '' });

                setDrawerOpen(false);
              }}
            >
              Create Topic
            </button>
            <button
              className="p-2 bg-gray-300 rounded"
              type="button"
              title="Cancel"
              onClick={() => setDrawerOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Drawer>
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
