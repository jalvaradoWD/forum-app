import { Drawer } from '@mui/material';
import { Category } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ChangeEvent, FC, useState } from 'react';
import { ICategory } from '../lib/interfaces/DatabaseInterfaces';

interface ITopicFormData {
  title: string | undefined;
  description: string | undefined;
}

const CreateTopicDrawer: FC<{
  category: Category;
  categoryState: ICategory;
  setCategoryState: Function;
}> = ({ category, categoryState, setCategoryState }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const [topicFormData, setTopicFormData] = useState<ITopicFormData>({
    title: '',
    description: '',
  });

  const submitTopicFormData = async ({}) => {
    // Creating a topic for the category
    if (!session?.user) return new Error('Not logged in');

    const topicData = {
      title: topicFormData.title,
      description: topicFormData.description,
      categoryId: category.id,
    };

    const res = await axios.post('/api/topic/create', topicData);

    if (res.status !== 200) throw new Error("Topic couldn't be created");

    setTopicFormData({ title: '', description: '' });
    setDrawerOpen(false);
    setCategoryState({
      ...categoryState,
      Topic: [res.data.topic, ...categoryState.Topic],
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();

    setTopicFormData({ ...topicFormData, [e.target.name]: e.target.value });
  };

  return (
    <>
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
              onClick={submitTopicFormData}
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
    </>
  );
};

export default CreateTopicDrawer;
