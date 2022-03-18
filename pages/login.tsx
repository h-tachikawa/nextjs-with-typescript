import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React from "react";

type FormValues = {
  email: string;
  password: string;
};

const SignUpSchema: SchemaOf<FormValues> = Yup.object().shape({
  email: Yup.string()
      .email("メールアドレスが不正です")
      .required("メールアドレスは必須です"),
  password: Yup.string()
    .min(8, "パスワードは8文字以上にしてください")
    .required("パスワードは必須です"),
});

const LoginContainer: NextPage = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="xs">
      <Grid
        container
        my={4}
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
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
              error={Boolean(formik.errors.email) && formik.touched.email}
              helperText={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              size="small"
              fullWidth
              error={Boolean(formik.errors.password) && formik.touched.password}
              helperText={
                formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid}
              fullWidth
            >
              Sign Up
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default LoginContainer;
