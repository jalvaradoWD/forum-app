import axios from 'axios';
import moment from 'moment';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import CreateTopicDrawer from '../../components/CreateTopicDrawer';
import { ICategory } from '../../lib/interfaces/DatabaseInterfaces';

const Category: NextPage<{ category: ICategory }> = ({ category }) => {
  const { data: session } = useSession();
  const [categoryState, setCategoryState] = useState<ICategory>(category);

  return (
    <>
      <h1 className="text-center text-5xl font-bold bg-purple-900 text-white py-2">
        {categoryState.name}
      </h1>

      <div className="p-4 flex flex-col gap-12">
        <div className="flex flex-row justify-between bg-slate-800 text-white box-border rounded">
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
            <CreateTopicDrawer
              category={categoryState}
              categoryState={categoryState}
              setCategoryState={setCategoryState}
            />
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          {category.Topic.map((topic) => {
            return (
              <div
                key={topic.id}
                className="border-b-2 border-gray-500 last:border-b-transparent flex flex-row first:rounded-tr first:rounded-tl last:rounded-bl last:rounded-br"
              >
                <div className="p-2  text-blue-800 font-bold w-full">
                  <Link href={`/t/${topic.id}`}>{topic.title}</Link>
                </div>
                <div className="p-2  text-center w-36">
                  {moment(topic.createdAt).format('MM Do YY')}
                </div>
                <div className="p-2  text-center w-36">
                  {moment(topic.updatedAt).format('MM Do YY')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const res = await axios.get<ICategory>(
    `http://localhost:3000/api/category/${id}`
  );
  const data = res.data;

  return {
    props: {
      category: data,
    },
  };
};

export default Category;
