import './App.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Row, Col, Divider, Form, Input, Checkbox, Radio } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import _ from 'lodash';

function App(props) {
  const style = { background: '#0092ff', padding: '8px 0', width: '100%' };
  const iconTypes = ['warning', 'error', 'success', 'info', 'question'];
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 20 }}>
      <p style={{ fontSize: 18, fontWeight: 600 }}>sweetalert2 demo</p>
      <div>

        <Divider orientation="left">Mixin</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertMixin}>Log in</Button>
          </Col>
        </Row>
        <Divider orientation="left">Inputs</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputText}>Text</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputEmail}>Email</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputUrl}>Url</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputPassword}>Password</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputTextArea}>TextArea</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputSelect}>Select</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputRadio}>Radio</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputCheckbox}>Checkbox</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputFile}>File</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputRange}>Range</Button>
          </Col>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showAlertInputMulti}>Multi-input</Button>
          </Col>
        </Row>
        <Divider orientation="left">Custom</Divider>
        <div style={{ display: 'flex' }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ width: '60%' }}
          >
            <Form.Item
              label="title"
              // name="title"
            >
              <Input value={props.title} onChange={(e) => props.onTitleChange(e.target.value)} />
            </Form.Item>

            <Form.Item label="icon" >
              <Radio.Group value={props.icon} onChange={(e) => props.onIconChange(e.target.value)}>
                {_.map(iconTypes, type => {
                  return(
                    <Radio.Button value={type}>{type}</Radio.Button>
                  )
                })}
              </Radio.Group>
            </Form.Item>

            {/* <Form.Item label="input">
              <Radio.Group value={props.input} onChange={(e) => props.onInputChange(e.target.value)}>
                <Radio.Button value="warning">warning</Radio.Button>
                <Radio.Button value="error">error</Radio.Button>
                <Radio.Button value="success">success</Radio.Button>
                <Radio.Button value="info">info</Radio.Button>
                <Radio.Button value="question">question</Radio.Button>
              </Radio.Group>
            </Form.Item> */}

            {/* <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item> */}

            {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
          </Form>
        </div>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={2}>
            <Button onClick={props.showCustomAlert}>Custom alert</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

let hoc = WrappedComponent => {
  return class EnhancedComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        title: 'Title',
        icon: 'success',
        input: 'text'

      }
    }

    componentDidMount = () => {

    }

    showAlertMixin = () => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }

    showAlertInputText = async () => {
      const ipAPI = '//api.ipify.org?format=json'

      const inputValue = fetch(ipAPI)
        .then(response => response.json())
        .then(data => data.ip)

      const { value: ipAddress } = await Swal.fire({
        title: 'Enter your IP address',
        input: 'text',
        inputLabel: 'Your IP address',
        inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (ipAddress) {
        Swal.fire(`Your IP address is ${ipAddress}`)
      }
    }

    showAlertInputEmail = async () => {
      const { value: email } = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
      })

      if (email) {
        Swal.fire(`Entered email: ${email}`)
      }
    }


    showAlertInputUrl = async () => {
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
      })

      if (url) {
        Swal.fire(`Entered URL: ${url}`)
      }
    }

    showAlertInputPassword = async () => {
      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })

      if (password) {
        Swal.fire(`Entered password: ${password}`)
      }
    }

    showAlertInputTextArea = async () => {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })

      if (text) {
        Swal.fire(text)
      }
    }


    showAlertInputSelect = async () => {
      const { value: fruit } = await Swal.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
          'Fruits': {
            apples: 'Apples',
            bananas: 'Bananas',
            grapes: 'Grapes',
            oranges: 'Oranges'
          },
          'Vegetables': {
            potato: 'Potato',
            broccoli: 'Broccoli',
            carrot: 'Carrot'
          },
          'icecream': 'Ice cream'
        },
        inputPlaceholder: 'Select a fruit',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'oranges') {
              resolve()
            } else {
              resolve('You need to select oranges :)')
            }
          })
        }
      })

      if (fruit) {
        Swal.fire(`You selected: ${fruit}`)
      }
    }


    showAlertInputRadio = async () => {
      /* inputOptions can be an object or Promise */
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            '#ff0000': 'Red',
            '#00ff00': 'Green',
            '#0000ff': 'Blue'
          })
        }, 1000)
      })

      const { value: color } = await Swal.fire({
        title: 'Select color',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to choose something!'
          }
        }
      })

      if (color) {
        Swal.fire({ html: `You selected: ${color}` })
      }
    }

    showAlertInputCheckbox = async () => {
      const { value: accept } = await Swal.fire({
        title: 'Terms and conditions',
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder:
          'I agree with the terms and conditions',
        confirmButtonText:
          'Continue <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
          return !result && 'You need to agree with T&C'
        }
      })

      if (accept) {
        Swal.fire('You agreed with T&C :)')
      }
    }

    showAlertInputFile = async () => {
      const { value: file } = await Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Upload your profile picture'
        }
      })

      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          Swal.fire({
            title: 'Your uploaded picture',
            imageUrl: e.target.result,
            imageAlt: 'The uploaded picture'
          })
        }
        reader.readAsDataURL(file)
      }
    }

    showAlertInputRange = async () => {
      Swal.fire({
        title: 'How old are you?',
        icon: 'question',
        input: 'range',
        inputLabel: 'Your age',
        inputAttributes: {
          min: 8,
          max: 120,
          step: 1
        },
        inputValue: 25
      })
    }

    showAlertInputMulti = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input id="swal-input1" class="swal2-input">' +
          '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })

      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
    }


    onTitleChange = (value) => {
      this.setState({ title: value });
    }

    onIconChange = (value) => {
      this.setState({ icon: value });
    }

    onInputChange = (value) => {
      this.setState({ input: value });
    }



    showCustomAlert = () => {
      Swal.fire({
        title: this.state.title,
        icon: this.state.icon,
        // input: this.state.input
      })
    }



    render() {
      return <WrappedComponent
        showAlertMixin={this.showAlertMixin}
        showAlertInputText={this.showAlertInputText}
        showAlertInputEmail={this.showAlertInputEmail}
        showAlertInputUrl={this.showAlertInputUrl}
        showAlertInputPassword={this.showAlertInputPassword}
        showAlertInputTextArea={this.showAlertInputTextArea}
        showAlertInputSelect={this.showAlertInputSelect}
        showAlertInputRadio={this.showAlertInputRadio}
        showAlertInputCheckbox={this.showAlertInputCheckbox}
        showAlertInputFile={this.showAlertInputFile}
        showAlertInputRange={this.showAlertInputRange}
        showAlertInputMulti={this.showAlertInputMulti}
        showCustomAlert={this.showCustomAlert}
        title={this.state.title}
        icon={this.state.icon}
        input={this.state.input}
        onTitleChange={this.onTitleChange}
        onIconChange={this.onIconChange}
        onInputChange={this.onInputChange}

      />
    }
  }
}

export default hoc(App);