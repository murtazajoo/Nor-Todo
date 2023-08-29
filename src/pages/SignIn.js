import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsGithub } from "react-icons/bs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const supabase = useSupabaseClient();

  const githubSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 6, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            class="font-display text-5xl my-10"
            component="h1"
            variant="h4"
          >
            Sign in
          </Typography>
          <Button
            onClick={githubSignin}
            variant="outlined"
            size="large"
            className="w-60 py-4"
          >
            <BsGithub className="mr-4" /> Sign In With Github
          </Button>

          <Typography class="font-mono text-slate-600 text-sm my-10">
            You can Only Sign Ip with a
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 "
            >
              {" "}
              Github
            </a>{" "}
            Account.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
