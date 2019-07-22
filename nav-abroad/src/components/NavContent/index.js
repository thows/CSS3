import React from "react";
import {Card, Avatar, Layout, List, Icon} from 'antd';

const {Meta} = Card;

const {Content,Header} = Layout;

class NavContent extends React.Component {
    render() {
        return <div style={{margin: 50,display:'flex',flexDirection:'column'}}>




            <Card style={{marginTop: 28, boxShadow: '0px 2px 0px rgba(170,170,170,0.1)', background: "#f9f9f9"}}>
                <Meta
                    avatar={<Icon type="environment" theme="filled"/>}
                    title="伊朗 Iran"
                />
            </Card>
                <List style={{ marginTop: 20, background: "#f9f9f9"}}
                      grid={{
                          gutter: 29,
                          xs: 1,
                          sm: 1,
                          md: 1,
                          lg: 3,
                          xl: 3,
                          xxl: 3,
                          column: 3
                      }}>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="科学研究和技术部"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="卫生与医学教育部"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="道路与城市发展部"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="国家民航局"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="伊朗贸易促进中心"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="伊朗地毯股份公司"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="住房银行"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="国家石油公司"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                    <List.Item style={{margin: 12}}>
                        <Card hoverable>
                            <Meta style={{marginTop: '10px'}}
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title="SARAKHS经济特区"
                                  description="网站描述信息"/>
                        </Card>
                    </List.Item>
                </List>

            <Card style={{marginTop: 28, boxShadow: '0px 2px 0px rgba(170,170,170,0.1)', background: "#f9f9f9"}}>
                <Meta
                    avatar={<Icon type="environment" theme="filled"/>}
                    title="伊朗 Iran"
                />
            </Card>
            <List style={{ marginTop: 20, background: "#f9f9f9"}}
                  grid={{
                      gutter: 29,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 3,
                      xl: 3,
                      xxl: 3,
                      column: 3
                  }}>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
            </List>

            <Card style={{marginTop: 28, boxShadow: '0px 2px 0px rgba(170,170,170,0.1)', background: "#f9f9f9"}}>
                <Meta
                    avatar={<Icon type="environment" theme="filled"/>}
                    title="伊朗 Iran"
                />
            </Card>
            <List style={{ marginTop: 20, background: "#f9f9f9"}}
                  grid={{
                      gutter: 29,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 3,
                      xl: 3,
                      xxl: 3,
                      column: 3
                  }}>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
                <List.Item style={{margin: 12}}>
                    <Card hoverable>
                        <Meta style={{marginTop: '10px'}}
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title="标题"
                              description="网站描述信息"/>
                    </Card>
                </List.Item>
            </List>
        </div>
    }
}

export default NavContent
