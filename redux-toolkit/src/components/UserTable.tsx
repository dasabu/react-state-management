import { Table, Button, Modal, Input, Form } from 'antd'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  createUser,
  deleteUser,
  fetchUsers,
  resetUserCreationStatus,
  updateUser,
} from '../redux/user/user.slice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface User {
  id: number
  name: string
  email: string
}

export interface UserForm {
  id?: number
  name: string
  email: string
}

const userColumns = (
  openModal: (user?: User) => void,
  handleDelete: (userId: number) => void
) => [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, user: User) => (
      <>
        <Button onClick={() => openModal(user)}>Edit</Button>
        <Button danger onClick={() => handleDelete(user.id)}>
          Delete
        </Button>
      </>
    ),
  },
]

const UserTable = () => {
  const dispatch = useAppDispatch()
  const { users, isUserCreated, isUserDeleted, isUserUpdated } = useAppSelector(
    (state) => state.userReducer
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [form] = Form.useForm<UserForm>()
  // Fetch list of user data
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const openModal = (user?: User) => {
    if (user) {
      setSelectedUser(user)
      form.setFieldsValue(user)
    } else {
      setSelectedUser(undefined)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedUser) {
        dispatch(updateUser({ id: selectedUser.id, ...values }))
      } else {
        dispatch(createUser(values))
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedUser(undefined)
  }

  const handleDelete = (userId: number) => {
    if (confirm(`Are you sure want to delete userId = ${userId}?`)) {
      dispatch(deleteUser(userId))
    }
  }

  // Close modal when user is created successfully
  useEffect(() => {
    if (isUserCreated === true) {
      setIsModalOpen(false)
      setSelectedUser(undefined)
      toast.success('Create user successfully')
      dispatch(resetUserCreationStatus())
    } else if (isUserCreated === false) {
      toast.error('Failed to create user')
      dispatch(resetUserCreationStatus())
    }
  }, [isUserCreated, dispatch])

  useEffect(() => {
    if (isUserDeleted === true) {
      toast.success('Delete user successfully')
      dispatch(resetUserCreationStatus())
    } else if (isUserDeleted === false) {
      toast.error('Failed to delete user')
      dispatch(resetUserCreationStatus())
    }
  }, [isUserDeleted, dispatch])

  useEffect(() => {
    if (isUserUpdated === true) {
      setIsModalOpen(false)
      setSelectedUser(undefined)
      toast.success('Update user successfully')
      dispatch(resetUserCreationStatus())
    } else if (isUserUpdated === false) {
      toast.error('Failed to update user')
      dispatch(resetUserCreationStatus())
    }
  }, [isUserUpdated, dispatch])

  return (
    <>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>
      <Table
        columns={userColumns(openModal, handleDelete)}
        dataSource={users}
        rowKey="id"
      />

      <Modal
        title={selectedUser ? 'Edit User' : 'Add User'}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserTable
