import { Tabs } from 'antd';
import Styled from 'styled-components';

const { TabPane } = Tabs;

const TabBasic = Styled(Tabs)`
  margin-bottom: 30px !important;
  .ant-tabs-nav-wrap{
    .ant-tabs-tab{
      &.ant-tabs-tab-active{
        .ant-tabs-tab-btn{
          color: #28572a;
        }
        span{
          color: rgb(64, 64, 64);
        }
      }
    }
    .ant-tabs-tab-btn{
      color: #666D92;
    }
    .ant-tabs-ink-bar{
      background-color: #28572a;
    }
  }
  .ant-tabs-content-holder{
    h1,
    h2,
    h3,
    h4,
    h5,
    h6{
      color: rgb(64, 64, 64);
    }
    p{
      color: rgb(64, 64, 64);
    }
  }
  &.hexadash-tab-primary{
    .ant-tabs-nav{
      .ant-tabs-tab{
        &.ant-tabs-tab-active{
          color: #fff;
          border-radius: 3px;
          background-color: #28572a;
          span{
            color: #fff;
          }
        }
      }
    }
    .ant-tabs-content{
      padding: 15px;
      background-color: #28572a;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p{
        color: #fff;
      }
    }
  }
  &.hexadash-tab-white{
    .ant-tabs-nav{
      .ant-tabs-tab{
        &.ant-tabs-tab-active{
          color: #28572a;
          border-radius: 3px;
          background-color: rgb(242 238 227 / 1);
          span{
            color: #28572a;
          }
        }
      }
    }
    .ant-tabs-content{
      padding: 15px;
      background-color: rgb(242 238 227 / 1);
      h1,
      h2,
      h3,
      h4,
      h5,
      h6{
        color: rgb(64, 64, 64);
      }
      p{
        color: rgb(64, 64, 64);
      }
    }
  }
`;

const Child = Styled(TabPane)` 
    
`;

export { TabBasic, Child };
