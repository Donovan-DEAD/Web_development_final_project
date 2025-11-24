"use client";

import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface UserPermsRowProps {
  user: {
    _id: string;
    email: string;
    name: string;
    permsLabel: string; // 'admin', 'editor', or 'user'
  };
  onPermissionChange: (userId: string, newPerm: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UserPermsRow: React.FC<UserPermsRowProps> = ({ user, onPermissionChange, onDeleteUser }) => {
  const [selectedPerm, setSelectedPerm] = useState<string>(user.permsLabel);

  const handlePermChange = (event: SelectChangeEvent<string>) => {
    const newPerm = event.target.value;
    setSelectedPerm(newPerm);
    onPermissionChange(user._id, newPerm);
  };

  const handleDeleteClick = () => {
    onDeleteUser(user._id);
  };

  return (
    <TableRow data-user-id={user._id}>
      <TableCell>
        <Typography>{user.email}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{user.name}</Typography>
      </TableCell>
      <TableCell>
        <Select
          value={selectedPerm}
          onChange={handlePermChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="form-select permission-select"
          data-original-permission={user.permsLabel}
          sx={{ minWidth: 120 }} // Basic styling, use CSS for more control
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          className="btn btn-danger delete-user-btn"
          onClick={handleDeleteClick}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserPermsRow;
