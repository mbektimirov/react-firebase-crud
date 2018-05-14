import React from 'react'

// components
import { Table, Button, Divider } from 'antd'

// libs
import { connect } from 'react-redux'
import moment from 'moment'
import Router from 'next/router'

import { deleteUser } from '../actions'

const navigateToUserEdit = (user) => {
  const href = {
    pathname: '/',
    query: { edit: user.id },
  }

  console.log('Navigating to:', href)

  Router.push(href, href, { shallow: true })
}

const UsersTable = ({ users, dispatch }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Birth date',
      dataIndex: 'birth_date',
      key: 'birth_date',
      render: (date) => moment(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (phone ? `+7${phone}` : ''),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user) => {
        return (
          <div>
            <Button onClick={() => navigateToUserEdit(user)}>Edit</Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => dispatch(deleteUser(user))}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={false}
      rowKey={(user) => user.id}
    />
  )
}

export default connect()(UsersTable)
