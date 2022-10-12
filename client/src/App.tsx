import { Box, List, ThemeIcon } from '@mantine/core';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import useSWR from 'swr';
import './App.css';
import { AddTodo } from './components/AddTodo';

export const ENDPOINT = 'http://localhost:4000';

export type Todo = {
  id: number;
  title: string;
  body: string;
  done: boolean;
};

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export const App = () => {
  const { data, mutate } = useSWR('api/todos', fetcher);

  const markTodoDone = async (id: number) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: 'PATCH',
    }).then((res) => res.json());

    mutate(updated);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: '2rem',
        width: '100%',
        maxWidth: '40rem',
        margin: '0 auto',
      })}
    >
      <List spacing={'xs'} size={'sm'} mb={12} center>
        {data?.map((todo: Todo) => {
          return (
            <List.Item
              onClick={() => markTodoDone(todo.id)}
              key={`todo__${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color={'cyan'} size={24} radius={'xl'}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color={'yellow'} size={24} radius={'xl'}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
};
