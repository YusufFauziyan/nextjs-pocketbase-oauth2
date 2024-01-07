import { useState } from 'react';
import PocketBase from 'pocketbase';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

const url = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(url);

// ----------------------------------------------------------------------

const exampleUser = {
  avatar: '',
  collectionId: '_pb_users_auth_',
  collectionName: 'users',
  created: '2024-01-02 11:35:37.393Z',
  email: 'example@gmail.com',
  emailVisibility: false,
  firstName: 'Jhon',
  id: '1i1vh0vq7a8bawc',
  jPort: 0,
  jToken: '',
  lastName: 'Doe',
  role: 'authenticated',
  updated: '2024-01-06 11:39:54.109Z',
  username: 'Jhon',
  verified: true,
  avatarUrl: '/assets/images/avatars/avatar_25.jpg',
};

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState('');

  // console.log(authData);

  const googleAuth = async () => {
    const authData = await pb.collection('users').authWithOAuth2({
      provider: 'google',
    });

    localStorage.setItem(
      'user',
      JSON.stringify({ ...authData.record, avatarUrl: authData.meta.avatarUrl })
    );
    router.push('/dashboard');
  };

  const githubAuth = async () => {
    const authData = await pb.collection('users').authWithOAuth2({
      provider: 'github',
    });

    localStorage.setItem(
      'user',
      JSON.stringify({ ...authData.record, avatarUrl: authData.meta.avatarUrl })
    );
    router.push('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    if (email.value === exampleUser.email && password.value === '123456') {
      localStorage.setItem('user', JSON.stringify(exampleUser));
      return router.push('/dashboard');
    }
    return setFailedLogin('Invalid email or password');
  };

  const handleLoginGoogle = () => {
    googleAuth();
  };

  const handleLoginGithub = () => {
    githubAuth();
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack>
          <Typography textAlign="end" variant="caption" sx={{ mb: 0.5 }}>
            {exampleUser.email}
          </Typography>
          <TextField required name="email" label="Email address" />
        </Stack>

        <Stack>
          <Typography textAlign="end" variant="caption" sx={{ mb: 0.5 }}>
            {exampleUser.password}
          </Typography>
          <TextField
            required
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Login
      </LoadingButton>

      <Typography variant="subtitle1" sx={{ color: 'red' }}>
        {failedLogin}
      </Typography>
    </form>
  );

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
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleLoginGoogle}
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
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
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
