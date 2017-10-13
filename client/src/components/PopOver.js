import React from 'react';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default ({ isOpen, toggle, target }) => {
  return (
    <Popover placement="bottom" isOpen={isOpen} target={target} toggle={toggle}>
      <PopoverHeader>Delete Course</PopoverHeader>
      <PopoverBody>Hi</PopoverBody>
    </Popover>
  );
};
