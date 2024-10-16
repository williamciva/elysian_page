"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from '@/components/sign-up/theme/getSignUpTheme';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import NextLink from 'next/link';
import ElysianIcon from '/public/logo_wo_bg.png';
import '/src/app/signup/signup.css';
import Register, { registerRequest } from '@/provider/requests/Register';
import { useRouter } from 'next/navigation';
import { showPopError } from '@/utils/popup-utils';
import { usePopup } from '@/provider/popup-provider';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const router = useRouter()
  const [isClient, setIsClient] = React.useState(false)
  const popup = usePopup();

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode as 'light' | 'dark');
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }

    setIsClient(true)
  }, []);

  const handleMouseEnter = () => {
    setIsAnimated(true);
  };

  const handleMouseLeave = () => {
    setIsAnimated(false);
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const lastName = document.getElementById('lastName') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Insira um e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value ||
      password.value.length < 9 ||
      !/[A-Z]/.test(password.value) ||
      !/[a-z]/.test(password.value) ||
      !/[0-9]/.test(password.value) ||
      !/[^A-Za-z0-9]/.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage('A senha deve conter no mínimo 9 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Nome é obrigatório.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Sobrenome é obrigatório.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validateInputs()) {
      const requestData: registerRequest = {
        firstName: data.get('name') as string,
        lastName: data.get('lastName') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
      };

      const response = await Register.post({ credentials: requestData });

      if (response instanceof Register) {
        console.log('Registro bem-sucedido', response);
        router.push('/login')
      } else {
        showPopError(popup, response)
      }
    }
  };

  return (
    isClient ?
        <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <SignUpContainer direction="column" justifyContent="space-between">
            <Stack
              sx={{
                justifyContent: 'center',
                height: '100dvh',
                p: 2,
              }}
            >
              <Card variant="outlined">
                <NextLink href="/" passHref>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    className={`logo-login logo-animation ${isAnimated ? 'reverse' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={ElysianIcon}
                      alt="Elysian logo"
                      width={100}
                      height={100}
                    />
                  </Box>
                </NextLink>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                  }}
                >
                  Crie sua conta
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <FormControl>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      placeholder="Michael"
                      error={nameError}
                      helperText={nameErrorMessage}
                      color={nameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
                    <TextField
                      autoComplete="lastName"
                      name="lastName"
                      required
                      fullWidth
                      id="lastName"
                      placeholder="Jordan"
                      error={lastNameError}
                      helperText={lastNameErrorMessage}
                      color={lastNameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                      autoComplete="email"
                      name="email"
                      required
                      fullWidth
                      id="email"
                      placeholder="michael@email.com"
                      error={emailError}
                      helperText={emailErrorMessage}
                      color={emailError ? 'error' : 'primary'}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      placeholder="Sua senha"
                      error={passwordError}
                      helperText={passwordErrorMessage}
                      color={passwordError ? 'error' : 'primary'}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Criar conta
                  </Button>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'grey.500',
                      fontSize: '14px',
                    }}
                  >
                    <Link href="/login" component={NextLink}>
                      Já tem uma conta? Faça login.
                    </Link>
                  </Typography>
                </Box>
              </Card>
            </Stack>
          </SignUpContainer>
        </ThemeProvider>
      : null
  );
}