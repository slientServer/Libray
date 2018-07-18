import React from 'react';
import { Badge, Avatar } from 'antd';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const CustomAvatar = (props) => {
  let color = colorList[(props.username ? props.username.length%4 : 0)];
  return <Badge count={props.count}>
    <a href={props.path}>      
      <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
        {props.username}
      </Avatar>
    </a>
  </Badge>;
}

export default CustomAvatar;
