import React, { useContext } from "react";
import Link from "next/link";
import { SignInWrapper, Logo, Container } from "./styles";
import Input from "layout/Input";
import Button from "layout/Button";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import Error from "layout/Error";
import Router from "next/router";
import { yupResolver } from '@hookform/resolvers/yup';
import LoginMutation from 'graphql/auth/LoginMutation.graphql';
import { GlobalContext } from "ctx/globalCtx";

const SignIn: React.FunctionComponent = () => {
  const [login, { error: loginError }] = useMutation(LoginMutation, { errorPolicy: 'all' }),
    { addUserId } = useContext(GlobalContext),
    signInSchema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required().min(8),
    }),
    methods = useForm({
      resolver: yupResolver(signInSchema),
      mode: "onBlur"
    });

  const onSignInSubmit = async (values: any) => {
    const res = await login({ variables: { data: { ...values } } });

    if (res) {
      addUserId(res.data.login.user.id);
      localStorage.setItem('token', res.data.login.accessToken);
      Router.push("/account-crawlers");
    }
  };

  return (
    <SignInWrapper>
      <Logo />
      <h1>Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link href="sign-up">
          <a>
            <b>Create a new one</b>
          </a>
        </Link>
      </p>

      <Container>
        {loginError &&
          loginError.graphQLErrors.map((error, i) => (
            <Error message={error.message} key={i} />
          ))}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSignInSubmit)}>
            <Input
              shadow="container"
              name="username"
              type="topLabel"
              label="Username"
            />
            <Input
              shadow="container"
              name="password"
              type="topLabel"
              inputType="password"
              label="Password"
            />
            <Button buttonType="submit" value="Sign in" />
          </form>
        </FormProvider>
      </Container>
    </SignInWrapper>
  );
};

export default SignIn;
