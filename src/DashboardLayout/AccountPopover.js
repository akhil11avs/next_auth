import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import Box from '@/components/Box';
import Logout from '@/screens/Logout';
import Divider from '@/components/Divider';
import { useAppSelector } from '@/redux/hook';
import Typography from '@/components/Typography';
import RouterLink from '@/components/RouterLink';
import Link from 'next/link';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    url: '/profile'
  },
];

export default function AccountPopover() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const data = useAppSelector(state => state?.user?.data);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src="/assets/images/avatars/avatar_25.jpg"
          alt={data?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {data.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography sx={{ fontSize: '14px', fontFamily: 'var(--font-Poppins-SemiBold)' }} noWrap>
            {data?.name}
          </Typography>
          <Typography sx={{ fontSize: '12px', fontFamily: 'var(--font-Poppins-Medium)', color: 'text.secondary' }} noWrap>
            {data?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <Link key={option?.label} href={option?.url}>
            <MenuItem onClick={handleClose}>
              <Typography sx={{ fontSize: '14px', fontFamily: 'var(--font-Poppins-SemiBold)' }}>
                {option?.label}
              </Typography>
            </MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: '0 !important' }} />

        <MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
          <Logout />
        </MenuItem>
      </Popover>
    </>
  );
}
