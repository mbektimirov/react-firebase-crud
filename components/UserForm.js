import React from 'react'

// components
import { Form, Input, Button, DatePicker } from 'antd'
import Link from 'next/link'

// libs
import Router from 'next/router'
import moment from 'moment'
import { connect } from 'react-redux'

import { persistUser, createUser, updateUser } from '../actions'

const FormItem = Form.Item

const fieldLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const formatUser = (user) => ({
  ...user,
  birth_date: user.birth_date ? user.birth_date.valueOf() : undefined,
})

class UserForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = formatUser(values)

        if (this.props.editId) {
          this.props.dispatch(
            updateUser({
              ...user,
              id: this.props.editId,
            })
          )
          Router.push('/')
        } else {
          this.props.dispatch(
            createUser({
              ...user,
              created_at: Date.now(),
            })
          )
        }

        this.props.form.resetFields()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Full name" {...fieldLayout}>
          {getFieldDecorator('full_name', {
            rules: [{ required: true, message: 'Please input your full name' }],
          })(<Input />)}
        </FormItem>

        <FormItem label="Birth date" {...fieldLayout}>
          {getFieldDecorator('birth_date', {
            rules: [
              { required: true, message: 'Please input your birth date' },
            ],
          })(<DatePicker format="DD.MM.YYYY" />)}
        </FormItem>

        <FormItem label="Address" {...fieldLayout}>
          {getFieldDecorator('address')(<Input />)}
        </FormItem>

        <FormItem label="City" {...fieldLayout}>
          {getFieldDecorator('city')(<Input />)}
        </FormItem>

        <FormItem label="Phone" {...fieldLayout}>
          {getFieldDecorator('phone')(
            <Input
              type="phone"
              addonBefore={<span>+7</span>}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            {this.props.editId ? 'Save' : 'Create'}
          </Button>
          <span>&nbsp;</span>

          {this.props.editId && (
            <Button>
              <Link href="/">
                <a>Cancel</a>
              </Link>
            </Button>
          )}
        </FormItem>
      </Form>
    )
  }
}

const AntForm = Form.create({
  onFieldsChange(props, singleField, fields) {
    // do not save to localStorage on active editing
    if (!props.editId) {
      props.dispatch(persistUser(fields))
    }
  },

  mapPropsToFields(props) {
    const fields = {}
    const keys = ['full_name', 'birth_date', 'address', 'city', 'phone']
    let currentUser = props.currentUser || {}
    const userToEdit = props.editId
      ? (props.users || []).find((user) => user.id === props.editId)
      : null

    keys.forEach((key) => {
      let value = userToEdit ? userToEdit[key] : (currentUser[key] || {}).value

      if (value && key === 'birth_date') {
        value = moment(value)
      }

      fields[key] = Form.createFormField({ ...currentUser[key], value })
    })

    return fields
  },
})(UserForm)

export default connect((state) => state)(AntForm)
