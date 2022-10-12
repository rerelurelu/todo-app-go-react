import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core';
import { ENDPOINT } from '../App';

export const AddTodo = ({ mutate }: { mutate: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
  });

  const createTodo = async (values: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    mutate(updated);
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Modal opened={isOpen} onClose={() => setIsOpen(false)} title="Create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps('title')}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps('body')}
          />
          <Button type="submit">Create todo</Button>
        </form>
      </Modal>
      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setIsOpen(true)}>
          ADD TODO
        </Button>
      </Group>
    </>
  );
};
