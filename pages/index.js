import React from 'react'

// components
import Link from 'next/link'
import { Layout, Breadcrumb, Row, Col } from 'antd'
import UserForm from '../components/UserForm'
import UsersTable from '../components/UsersTable'

// libs
import { withReduxSaga } from '../store'

// styles
import '../styles/main.css'

const { Header, Content, Footer } = Layout

const isClient = typeof window !== 'undefined'

class UsersIndex extends React.Component {
  render() {
    const editId = this.props.url.query.edit

    return (
      <Layout className="layout">
        <Header />
        <Content className="content-wrapper">
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item>
              <Link href="/">
                <a>Users</a>
              </Link>
            </Breadcrumb.Item>
            {editId && (
              <Breadcrumb.Item>
                Editing user: <strong>{editId}</strong>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="content">
            <Row>
              <Col md={null} lg={10}>
                {/* dirty hack to prevent ant-design FormItem server render bug */}
                {isClient && <UserForm editId={editId} />}
              </Col>
              <Col md={null} lg={14}>
                <UsersTable users={this.props.users} />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => state || {}

export default withReduxSaga(UsersIndex, mapStateToProps)
