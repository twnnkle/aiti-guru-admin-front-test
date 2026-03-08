import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AuthModal.module.scss";

import LiquidGlassWrapper from "../../../global/liquidGlassWrapper/LiquidGlassWrapper";
import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";
import Checkbox from "../../../ui/checkbox/Checkbox";

import AuthLogoIcon from "../../../icons/AuthLogoIcon";
import UsernameIcon from "../../../icons/UsernameIcon";
import ClearFieldIcon from "../../../icons/ClearFieldIcon";
import PasswordIcon from "../../../icons/PasswordIcon";
import ShowPasswordIcon from "../../../icons/ShowPasswordIcon";

import { useAuth } from "../../../../context/AuthContext";

import type { AuthFieldsI } from "../../../../types/auth";

function AuthModal() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuthFieldsI>();
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFieldsI) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError("password", {
        type: "manual",
        message: "Неверное имя или пароль",
      });
    }
  };

  const clearUsername = () => {
    setValue("username", "");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.authModal}>
      <LiquidGlassWrapper
        className={styles.logoIcon}
        borderRadius='100'
        borderSize='3'
      >
        <AuthLogoIcon />
      </LiquidGlassWrapper>

      <h2 className={styles.title}>Добро пожаловать!</h2>
      <p className={styles.description} data-text='Пожалуйста, авторизуйтесь'>
        Пожалуйста, авторизуйтесь
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.inputs}>
          <Input
            id='username'
            type='text'
            label='Логин'
            placeholder='Введите логин'
            error={errors.username?.message}
            {...register("username", {
              required: "Имя пользователя обязательно",
            })}
            inputIcon={<UsernameIcon />}
            action={{
              icon: <ClearFieldIcon />,
              onClick: clearUsername,
            }}
          />

          <Input
            id='password'
            type={showPassword ? "text" : "password"}
            label='Пароль'
            placeholder='Введите пароль'
            error={errors.password?.message}
            {...register("password", {
              required: "Пароль обязателен",
            })}
            inputIcon={<PasswordIcon />}
            action={{
              icon: <ShowPasswordIcon />,
              onClick: toggleShowPassword,
            }}
          />
        </div>

        <div className={styles.checkboxBlock}>
          <Checkbox id='rememberMe' {...register("rememberMe")} />
          <label htmlFor='rememberMe'>Запомнить данные</label>
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </Button>
      </form>
    </div>
  );
}

export default AuthModal;
