import PocketBase from 'pocketbase';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

const url = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(url);

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const googleAuth = async () => {
    const authData = await pb.collection('users').authWithOAuth2({
      provider: 'google',
      createData: {
        firstName: 'yusuf',
        lastName: 'Fauziyan',
        email: 'yusuf@gmail.com',
        username: 'yusuf',
      },
      body: {
        firstName: 'yusuf',
        lastName: 'Fauziyan',
        email: 'yusuf@gmail.com',
        username: 'yusuf',
      },
    });

    console.log(authData);
  };

  const githubAuth = async () => {
    await pb.collection('users').authWithOAuth2({
      provider: 'github',
    });
  };

  const handleLoginGoogle = () => {
    googleAuth();
  };

  const handleLoginGithub = () => {
    githubAuth();
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link href="/signin" variant="subtitle2" sx={{ ml: 0.5 }}>
              Sign in
            </Link>
          </Typography>
          <Stack spacing={1}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleLoginGoogle}
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Sign up with Google
              </Typography>
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleLoginGithub}
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="mdi:github" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Sign up with Github
              </Typography>
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
