import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import {
  AppBar,
  createTheme,
  ThemeOptions,
  IconButton,
  Toolbar,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, Inbox, Mail } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState } from 'react';
import { useRouter } from 'next/router';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#61dafb",
    },
    secondary: {
      main: "#fb61da",
    },
  },
};

const theme = createTheme(themeOptions);

type Props = {
  open: boolean;
  onClose: () => void;
};

export const TemporaryDrawer = (props: Props) => {
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <Box sx={{ width: 300 }} role="presentation">
        <List>
          {["Inbox", "Starred", "Send email", "Top"].map((text, index) => (
            <ListItem button key={text} onClick={props.onClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const router = useRouter();

  const handleClose = async () => {
    toggleDrawer();
    await router.push("/");
  };

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                UR Rental Housing Visualizer
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {}}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <TemporaryDrawer open={drawerOpen} onClose={handleClose} />
          <Container>
            <Grid
              container
              my={4}
              flexDirection="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Component {...pageProps} />
            </Grid>
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
