import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MainGrid from './MainGrid';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ElysianIcon from '/public/logo_wo_bg.png';
import '/src/app/signup/signup.css';
import { TypeListItems } from './SideMenu';
import Documentation from './Documentation';

interface MenuContentProps {
  render: boolean;
  viewState: React.Dispatch<React.SetStateAction<TypeListItems | undefined>>;
}

export default function MenuContent(props: MenuContentProps) {
  const [mainListItems, setMainListItems] = React.useState<TypeListItems[]>([
    { context: 'main', text: 'Home', icon: <HomeRoundedIcon />, selected: true, element: <MainGrid /> },
    { context: 'main', text: 'Analises', icon: <AnalyticsRoundedIcon />, selected: false },
    { context: 'main', text: 'Contratos', icon: <PeopleRoundedIcon />, selected: false },
    { context: 'main', text: 'Documentação', icon: <AssignmentRoundedIcon />, selected: false, element: <Documentation /> },
    { context: 'secondary', text: 'Configurações', icon: <SettingsRoundedIcon />, selected: true },
    { context: 'secondary', text: 'Ajuda', icon: <InfoRoundedIcon />, selected: false },
  ]);

  const [isAnimated, setIsAnimated] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimated(true);
  };

  const handleMouseLeave = () => {
    setIsAnimated(false);
  };

  const selectItem = (index: number) => {
    const updatedItems = mainListItems.map((item, idx) => ({
      ...item,
      selected: idx === index,
    }));

    setMainListItems(updatedItems);
    props.viewState(updatedItems[index]);
  };

  React.useEffect(() => {
    if (props.render) {
      selectItem(0);
    }
  }, [props.render]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '10px', width: '100%' }}>
        <Link href="/" passHref>
          <div
            className={`logo-login logo-animation ${isAnimated ? 'reverse' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image src={ElysianIcon} alt="Logo" width={80} height={50} />
          </div>
        </Link>
      </div>

      <List dense sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
        {mainListItems.map((item, index) => item.context === 'main' ? (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={item.selected}
              onClick={() => selectItem(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ) : null)}
      </List>

      <List dense>
        {mainListItems.map((item, index) => item.context === 'secondary' ? (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={item.selected}
              onClick={() => selectItem(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ) : null)}
      </List>
    </Stack>
  );
}