import React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Typography from '@/components/Typography';

import Card from '..';
import './serviceCard.scss';
import CardMedia from '../CardMedia';

const ServiceCard = ({ imageUrl, title, content, url, sx }) => {
  const theme = useTheme();

  return (
    <Card className='service_card_container' sx={{ ...sx }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={imageUrl}
        style={{
          height: '193px'
        }}
      />
      <Typography className="service_card_title" color={theme.palette.primary.main}>{title}</Typography>
      <Typography className="service_card_content" color="text.secondary" title={content}>{content}</Typography>
      {url ? <Link href={url} target='_blank' className='service_card_link'>Read More <ArrowForwardIcon sx={{ height: 16, color: theme.palette.primary.main }} /></Link> : null}
    </Card>
  )
}

export default ServiceCard