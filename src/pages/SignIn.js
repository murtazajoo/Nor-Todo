import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const supabase = useSupabaseClient();

  const Signin = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" className="min-h-[100vh]" maxWidth="xs">
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

          <Button
            onClick={() => Signin("github")}
            variant="outlined"
            size="large"
            className="w-60 py-4"
          >
            <BsGithub className="mr-4" /> Sign In With Github
          </Button>

          <Button
            onClick={() => Signin("google")}
            variant="outlined"
            size="large"
            sx={{ my: 2 }}
            color="secondary"
            className="w-60 py-4 text-orange-300"
          >
            <BsGoogle className="mr-4" /> Sign In With Google
          </Button>

          <Typography className="font-mono pt-5 text-slate-600 text-sm my-10">
            You can Only Sign In with a
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 "
            >
              {" "}
              Github
            </a>{" "}
            or
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 "
            >
              {" "}
              Google
            </a>{" "}
            Account.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
