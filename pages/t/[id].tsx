import axios from 'axios';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { NextPage } from 'next';
import { Comment, Topic as TopicPrismaInterface, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface IComment extends Comment {
  author: User;
}

interface ITopic extends TopicPrismaInterface {
  author: User;
  Comment: IComment[];
}

const CreateCommentDrawer: FC = () => {
  const { query } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [commentFormState, setCommentFormState] = useState<{ body: string }>({
    body: '',
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setCommentFormState({
      ...commentFormState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      body: commentFormState.body,
      topicId: query.id,
    };

    console.log(data);

    const res = await axios.post(
      'http://localhost:3000/api/comment/create',
      data
    );

    if (res.status !== 200)
      return console.error('Error found when posting comment');
    setCommentFormState({ body: '' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="p-3 bg-blue-300 text-black"
        onClick={() => setIsOpen(true)}
      >
        + Create Comment
      </button>

      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <form className="p-4 flex flex-col gap-2" onSubmit={onSubmit}>
          <label htmlFor="body" className="text-2xl text-center">
            Comment Body
          </label>
          <input
            onChange={onChange}
            className="border-2 border-gray-400"
            type="text"
            name="body"
            id="body"
          />
          <button
            type="submit"
            className="rounded bg-green-800 text-white w-36 p-2 self-center"
          >
            Post Comment
          </button>
        </form>
      </Drawer>
    </>
  );
};

const Topic: NextPage<{ topic: ITopic }> = ({ topic }) => {
  const { data: session } = useSession();
  console.log(topic);
  return (
    <>
      <div className="mx-4 my-2 flex justify-items-center flex-col ">
        <label className="text-2xl text-green-700 font-bold">Title</label>
        <h1>{topic.title}</h1>
        <label className="text-2xl text-green-700 font-bold" htmlFor="">
          Description
        </label>
        <p>{topic.description}</p>
        <label className="text-2xl text-green-700 font-bold" htmlFor="">
          Created At
        </label>
        <p>{new Date(topic.createdAt).toISOString()}</p>

        <p>Created by: {topic.author.email}</p>
      </div>

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
          <CreateCommentDrawer />
        )}
      </div>

      <div>
        <ul className="flex flex-col border-t-2 border-t-pink-600 pt-3 gap-4">
          {topic.Comment.map((comment) => (
            <li
              key={comment.id}
              className="border-green-900 border-2 mx-12 p-2"
            >
              <Image
                className="rounded-full"
                src={comment.author.image! || '/images/guy.jpg'}
                width="50"
                height="50"
                alt="Testing"
              />
              <p>{comment.body}</p>
              <p>Created By: {comment.author.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const res = await axios.get(`http://localhost:3000/api/topic/${id}`);
  return { props: { topic: res.data } };
};

export default Topic;
