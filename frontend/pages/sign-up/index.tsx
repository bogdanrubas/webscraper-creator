import React, { useContext } from "react";
import Link from "next/link";
import { SignUpWrapper, Logo, Container } from "./styles";
import Input from "layout/Input";
import Button from "layout/Button";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import Error from "layout/Error";
import Router from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "ctx/globalCtx";
import SignupMutation from 'graphql/auth/SignupMutation.graphql';
import { useMutation } from "@apollo/client";

const SignUp: React.FunctionComponent = () => {
  const [signup, { error: signupError }] = useMutation(SignupMutation, { errorPolicy: 'all' }),
    { addUserId } = useContext(GlobalContext),
    signUpSchema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required().min(8),
    }),
    methods = useForm({
      resolver: yupResolver(signUpSchema),
      mode: "onBlur"
    });

  const onSignUpSubmit = async (values: any) => {
    console.log(values);

    const res = await signup({ variables: { data: { ...values } } });

    console.log(res);

    if (res) {
      addUserId(res.data.signup.user.id);
      localStorage.setItem('token', res.data.signup.accessToken);
      Router.push('/account-crawlers')
    }
  };

  return (
    <SignUpWrapper>
      <Logo />
      <h1>Sign up</h1>
      <p>
        Already have an account?{" "}
        <Link href="sign-in">
          <a>
            <b>Sign in</b>
          </a>
        </Link>
      </p>

      <Container>
        {signupError &&
          signupError.graphQLErrors.map((error, i) => (
            <Error message={error.message} key={i} />
          ))}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSignUpSubmit)}>
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
            <Button buttonType="submit" value="Sign up" />
          </form>
        </FormProvider>

        <small>
          By clicking Sign Up, you agree to our <b>Terms</b>.
        </small>
      </Container>

      <p>
        Already have an account? <b>Sign in</b>.
      </p>
    </SignUpWrapper>
  );
};

export default SignUp;
