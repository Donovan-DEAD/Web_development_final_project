"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserPermsRow from "@/components/UserPermsRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { Typography, TextField, Button as MuiButton, Select, MenuItem } from '@mui/material';
import Toast from '@/components/Toast'; // Assuming Toast component is generic enough
import { IUser } from '@/lib/models/user'; // Import IUser interface

interface UserDisplay extends IUser {
  // Add any client-side specific fields if necessary,
  // but mostly just reusing IUser
}

interface ManagePermsWrapperProps {
  authenticatedUser: IUser;
}

export default function ManagePermsWrapper({ authenticatedUser }: ManagePermsWrapperProps) {
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('email'); // 'email' or 'name'
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchUsers = async (page: number, field?: string, query?: string) => {
    setLoading(true);
    setToastMessage(null);
    try {
      let url = `/api/users?page=${page}`;
      if (field && query) {
        url += `&field=${field}&query=${query}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            router.push('/login'); // Redirect to login if API says unauthorized
            return;
        }
        throw new Error('Failed to fetch users.');
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setToastMessage(error.message || 'Error loading users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // authenticatedUser is guaranteed to be present due to the server component wrapper
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const fieldParam = searchParams.get('field') || undefined;
    const queryParam = searchParams.get('query') || undefined;
    setCurrentPage(pageParam);
    setSearchField(fieldParam || 'email');
    setSearchTerm(queryParam || '');
    fetchUsers(pageParam, fieldParam, queryParam);
  }, [searchParams]);


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset to first page on new search
    if (searchTerm) {
      params.set('field', searchField);
      params.set('query', searchTerm);
    } else {
      params.delete('field');
      params.delete('query');
    }
    router.push(`?${params.toString()}`);
  };

  const handlePermissionChange = async (userId: string, newPermLabel: string) => {
    setToastMessage(null);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, perm: newPermLabel }),
      });

      if (response.ok) {
        setToastMessage('Permission updated successfully.');
        fetchUsers(currentPage, searchField, searchTerm); // Refresh data
      } else {
        const errorData = await response.json();
        setToastMessage(errorData.message || 'Error updating permission.');
        if (response.status === 401 || response.status === 403) {
            router.push('/login'); // Redirect if API says unauthorized
        }
      }
    } catch (error) {
      console.error('Error updating permission:', error);
      setToastMessage('Network error updating permission.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setToastMessage(null);
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        setToastMessage('User deleted successfully.');
        fetchUsers(currentPage, searchField, searchTerm); // Refresh data
      } else {
        const errorData = await response.json();
        setToastMessage(errorData.message || 'Error deleting user.');
        if (response.status === 401 || response.status === 403) {
            router.push('/login'); // Redirect if API says unauthorized
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setToastMessage('Network error deleting user.');
    }
  };
  
  return (
    <>
      {toastMessage && <Toast message={toastMessage} severity="error" />}

      <div className="container mt-5">
        <Typography variant="h4" component="h1" gutterBottom>Manage User Permissions</Typography>
        <hr />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <Select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select search field' }}
            size="small"
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
          <MuiButton variant="contained" onClick={handleSearch}>Search</MuiButton>
        </Box>

        <TableContainer component={Paper}>
          <Table className="table table-striped table-hover">
            <TableHead className="thead-dark">
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Permission</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="user-table-body">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">Loading users...</TableCell>
                </TableRow>
              ) : (
                users.length > 0 ? (
                  users.map((u) => (
                    <UserPermsRow
                      key={u._id}
                      user={u}
                      onPermissionChange={handlePermissionChange}
                      onDeleteUser={handleDeleteUser}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No users found.</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </div>
    </>
  );
}
