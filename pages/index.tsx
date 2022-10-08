import {
  Button,
  Grid,
  Input,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import type { NextPage } from "next";
import MaterialImage from "../components/MaterialImage";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Typography variant="h2" textAlign="center" color="secondary">
        Your one stop solution for all you Restaurant needs!
      </Typography>
      <br />
      <Typography textAlign="center" variant="h4">
        Just sign up and get started today
      </Typography>
      <Box sx={{ marginY: 5 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item lg={4}>
            <Paper elevation={5} sx={{ paddingX: 3, paddingY: 3 }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Restaurant Name"
                    type="text"
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="standard"
                  />
                </Grid>
                <Grid item alignSelf="flex-end">
                  <Button variant="outlined">Sign Up</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <MaterialImage
              src="/assets/restaurant.webp"
              width={500}
              height={300}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;