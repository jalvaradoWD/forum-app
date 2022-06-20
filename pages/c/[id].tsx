import { Category } from '@prisma/client';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import CreateTopicDrawer from '../../components/CreateTopicDrawer';
import { ICategory } from '../../lib/interfaces/Categories';

const SubCategoryPage: NextPage<{ category: ICategory }> = ({ category }) => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-center text-5xl font-bold bg-purple-900 text-white py-2">
        {category.name}
      </h1>
      <div className="flex flex-row justify-between m-4 bg-slate-800 text-white box-border rounded">
        <div>
          <button
            className="p-3 bg-blue-300 text-black rounded-tl rounded-bl"
            type="button"
          >
            Latest
          </button>
          <button className="p-3 bg-blue-300 text-black" type="button">
            New
          </button>
          <button className="p-3 bg-blue-300 text-black" type="button">
            Top
          </button>
        </div>
        {session?.user === null || session?.user === undefined || (
          <CreateTopicDrawer category={category} />
        )}
      </div>
      <ul className="m-4 flex flex-col gap-2">
        {category.Topic.map((topic) => {
          return (
            <li key={topic.id} className="border-2 border-green-600 p-4">
              <h2 className="text-2xl font-bold">{topic.title}</h2>
              <p>{topic.description}</p>
              <p className="text-sm">
                {new Date(topic.createdAt).toISOString()}
              </p>
              <p className="text-sm">
                {new Date(topic.updatedAt).toISOString()}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const res = await axios.get(`http://localhost:3000/api/category/${id}`);
  const data: Category = await res.data;

  return {
    props: {
      category: data,
    },
  };
};

export default SubCategoryPage;
