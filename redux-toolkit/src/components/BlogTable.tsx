import { Table } from 'antd'

const blogColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Author', dataIndex: 'author', key: 'author' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Actions', dataIndex: 'actions', key: 'actions' },
]

const BlogTable = () => <Table columns={blogColumns} dataSource={[]} />

export default BlogTable
