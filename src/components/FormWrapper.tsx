import styled from 'styled-components';
import { Form } from 'antd';

const FormWrapper = styled(Form)`
  .ant-form-item {
    margin-bottom: 5px;
    .ant-form-item-label {
      padding-bottom: 0;
    }
    &.form-footer {
      margin-top: 30px;
    }
  }
`;

export default FormWrapper;
