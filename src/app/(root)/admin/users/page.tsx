"use client";

import { useGetAllUsers } from "@/hooks/queries/useUser";
import { User } from "@/types/user";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Group,
  Title,
  Box,
  LoadingOverlay,
  Paper,
} from "@mantine/core";
import AddUserModal from "./AddUserModal";

export default function UserAdminPage() {
  const { getAllUsers } = useGetAllUsers();
  const { data: users, isLoading, isError } = getAllUsers;
  const [addUserOpen, setAddUserOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150,
        Cell: ({ cell }) => cell.getValue<string | null>() || "Not provided",
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 100,
        Cell: ({ cell }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${
              cell.getValue<string>() === "ADMIN"
                ? "bg-purple-200 text-purple-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 100,
        Cell: ({ cell }) => cell.getValue<string | null>() || "Not specified",
      },
      {
        id: "birthdate",
        header: "Date of Birth",
        size: 150,
        Cell: ({ row }) => {
          const { dayOfBirth, monthOfBirth, yearOfBirth } = row.original;
          if (!dayOfBirth || !monthOfBirth || !yearOfBirth) {
            return "Not provided";
          }
          return `${dayOfBirth}/${monthOfBirth}/${yearOfBirth}`;
        },
      },
      {
        id: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => (
          <Group>
            <Button
              size="xs"
              variant="outline"
              color="blue"
              onClick={() => console.log("Edit user", row.original.id)}
            >
              <FaEdit />
            </Button>
            <Button
              size="xs"
              variant="outline"
              color="red"
              onClick={() => console.log("Delete user", row.original.id)}
            >
              <FaTrash />
            </Button>
          </Group>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: users || [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnDragging: true,
    enableGlobalFilter: true,
    mantineTableProps: {
      withBorder: true,
      striped: true,
      highlightOnHover: true,
    },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    mantineSearchTextInputProps: {
      placeholder: "Search all users...",
    },
    renderTopToolbarCustomActions: () => (
      <Button
        color="green"
        onClick={() => setAddUserOpen(true)}
        leftIcon={<FaUser />}
        className="ml-2"
      >
        Add User
      </Button>
    ),
  });

  if (isError) {
    return (
      <div className="p-8">
        <Paper p="xl" shadow="md" className="bg-red-50">
          <Title order={3} className="text-red-600">
            Error loading users data
          </Title>
          <p className="mt-2">Please try again later or contact support.</p>
        </Paper>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          loaderProps={{ size: "lg", color: "blue" }}
        />
        <MantineReactTable table={table} />
        <AddUserModal
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
        />
      </Box>
    </div>
  );
}
