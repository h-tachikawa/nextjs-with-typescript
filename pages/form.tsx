import { NextPage } from "next";
import { useFormik } from "formik";
import { Grid, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Form: NextPage = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "メールアドレスは必須です";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "メールアドレスの形式が不正です";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant={"h3"}>Form Example</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              direction="row"
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"flex-start"}
            >
              <Grid item xs={8}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  size="small"
                  fullWidth
                  error={formik.errors.email != null && formik.touched.email}
                  helperText={formik.errors.email}
                />
              </Grid>
              <Grid item xs={4}>
                <Button type="submit" variant="contained" disabled={!formik.isValid}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Box>
    </Container>
  );
};

export default Form;
