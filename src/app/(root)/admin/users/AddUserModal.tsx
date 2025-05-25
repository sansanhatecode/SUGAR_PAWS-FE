import React from "react";
import { Modal, TextInput, PasswordInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateUser } from "@/hooks/queries/useUser";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value: string) => (value ? null : "Vui lòng nhập tên người dùng"),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Vui lòng nhập email hợp lệ",
      password: (value: string) => (value ? null : "Vui lòng nhập mật khẩu"),
    },
  });

  const createUser = useCreateUser();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await createUser.mutateAsync(values);
      form.reset();
      onClose();
    } catch {
      // Có thể show thông báo lỗi ở đây nếu muốn
    }
  };

  return (
    <Modal opened={open} onClose={onClose} title="Tạo người dùng mới" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Tên người dùng"
          placeholder="Nhập tên người dùng"
          {...form.getInputProps("name")}
          required
        />
        <TextInput
          label="Email"
          placeholder="Nhập email"
          type="email"
          mt="md"
          {...form.getInputProps("email")}
          required
        />
        <PasswordInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          mt="md"
          {...form.getInputProps("password")}
          required
        />
        <Group position="right" mt="xl">
          <Button variant="default" onClick={onClose} type="button">
            Hủy
          </Button>
          <Button type="submit" loading={createUser.status === "pending"}>
            Tạo mới
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddUserModal;
