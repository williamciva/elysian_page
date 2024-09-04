import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

import { SitemarkIcon } from './CustomIcons';
import ElysianIcon from '/public/logo_wo_bg.png';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Desempenho adaptável',
    description:
      'Nosso produto se ajusta facilmente às suas necessidades, aumentando a eficiência e simplificando suas tarefas.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Construído para durar',
    description:
      'Experimente uma durabilidade incomparável que vai além, sendo um investimento duradouro.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Ótima experiência do usuário',
    description:
      'Integre nosso produto à sua rotina com uma interface intuitiva e fácil de usar.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Funcionalidade inovadora',
    description:
      'Mantenha-se à frente com recursos que estabelecem novos padrões, atendendo às suas necessidades em constante evolução melhor do que o restante.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Image src={ElysianIcon} alt="Elysian Logo" width={150} height={50} />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
