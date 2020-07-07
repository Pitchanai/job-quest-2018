import React from 'react'
import './App.css'

import he from 'he'

import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'

import ChuckNorrisService from './services/ChuckNorrisAPI'
import {
  ChuckNorrisData,
  ChuckNorrisDataType,
} from './interface/ChuckNorrisData'

interface AppState {
  requestedJoke: ChuckNorrisData
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      requestedJoke: {
        type: ChuckNorrisDataType.SUCCESS,
        value: {
          id: 0,
          joke: '',
        },
      },
    }
  }

  componentDidMount() {
    this.getDefaultJoke()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="joke-display">
            {he.decode(this.state.requestedJoke.value.joke ?? `Joke not found.`)}
          </div>
          <div className="form">
            <Form
              name="complex-form"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={this.submitForm}
              initialValues={{ Firstname: 'Chuck', Lastname: 'Norris' }}
            >
              <Form.Item label="Name" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="Firstname"
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}
                >
                  <Input placeholder="Firstname" />
                </Form.Item>
                <Form.Item
                  name="Lastname"
                  rules={[{ required: true }]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 4px)',
                    margin: '0 0 0 8px',
                  }}
                >
                  <Input placeholder="Lastname" />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="Joke No."
                name="jokeno"
                rules={[
                  { required: false, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder="(Optional)" />
              </Form.Item>

              <Form.Item colon={false} wrapperCol={{span: 24}}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </header>
      </div>
    )
  }

  // Submit Form
  submitForm = async (value: any) => {
    this.getJoke(value)
  }

  // Fetch API
  async getDefaultJoke() {
    const result = await ChuckNorrisService.getRandomJoke('Chuck', 'Norris')
    this.setState({ requestedJoke: result })
    console.log(result)
  }

  async getJoke(value: any) {
    if (!value.jokeno) {
      const result = await ChuckNorrisService.getRandomJoke(value.Firstname, value.Lastname)
      this.setState({ requestedJoke: result })
    } else {
      const result = await ChuckNorrisService.getSpecificJoke(value.jokeno, value.Firstname, value.Lastname)
      this.setState({ requestedJoke: result })
    }
  }
}

export default App
