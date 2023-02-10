import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip } from '@fluentui/react-components';
import { Filter24Filled } from '@fluentui/react-icons';
import { memo } from 'react';
import { useTodo } from '../store/useTodos';

function TodoMenu() {
  const clearCompleted = useTodo((s) => s.clearCompleted);
  const markAllCompleted = useTodo((s) => s.markAllCompleted);
  const markAllInCompleted = useTodo((s) => s.markAllInCompleted);

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip content='Do more with filter' relationship='label'>
          <Button icon={<Filter24Filled />} />
        </Tooltip>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem onClick={clearCompleted}>Clear Completed</MenuItem>

          <MenuItem onClick={markAllCompleted}>Check All</MenuItem>

          <MenuItem onClick={markAllInCompleted}>unCheck All</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}

export default memo(TodoMenu);
