// SectionHeader.tsx
import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


export interface SectionHeaderProps {
  text: string;
  icon: React.ReactElement;
  nestedItems?: string[];
  open: boolean;
  handleClick: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ text, icon, nestedItems, open, handleClick }) => (
    <>
      <ListItemButton sx={{ minHeight: 48, px: 2.5 }} onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        {text === 'Reports' && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {nestedItems && (
        <Collapse in={open && text === 'Reports'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nestedItems.map((nestedItem, index) => (
              <ListItemButton key={index} sx={{ pl: 4 }}>
                 <ListItemIcon>
                <StarOutlineIcon />
              </ListItemIcon>
                <ListItemText primary={nestedItem} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
  
  export default SectionHeader;