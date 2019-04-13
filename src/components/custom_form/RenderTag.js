import { getTemplate } from '../template'
import {input} from './control/Input';

const form_item = {
  input
};

const renderTag = function({ele, obj}) {
  const code = form_item[ele.toLowerCase()] && form_item[ele.toLowerCase()](obj);
  return code
}

export default renderTag