import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "./AddProductModal.module.scss";

import Button from "../../../../ui/button/Button";
import Input from "../../../../ui/input/Input";
import Modal from "../../../../global/modal/Modal";
import InputWithMask from "../../../../ui/inputWithMask/InputWithMask";

interface AddProductModalProps {
  isOpenModal: boolean;
  toggleModal: () => void;
}

interface FormValues {
  name: string;
  price: string;
  vendor: string;
  sku: string;
}

function AddProductModal({ isOpenModal, toggleModal }: AddProductModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: "",
      vendor: "",
      sku: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    alert("Создано");
    reset();
    toggleModal();
    console.log(data);
  };

  useEffect(() => {
    if (!isOpenModal) {
      reset();
    }
  }, [isOpenModal, reset]);

  return (
    <Modal isOpen={isOpenModal} onClose={toggleModal} title='Добавить товар'>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          id='name'
          label='Наименование'
          placeholder='Введите наименование'
          error={errors.name?.message}
          {...control.register("name", { required: "Поле обязательно" })}
        />

        <Controller
          name='price'
          control={control}
          rules={{ required: "Поле обязательно" }}
          render={({ field }) => (
            <InputWithMask
              id='price'
              label='Цена'
              placeholder='0,00'
              mask={Number}
              radix=','
              thousandsSeparator=''
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              inputRef={field.ref}
              error={errors.price?.message}
            />
          )}
        />

        <Input
          id='vendor'
          label='Вендор'
          placeholder='Введите вендора'
          error={errors.vendor?.message}
          {...control.register("vendor", { required: "Поле обязательно" })}
        />

        <Controller
          name='sku'
          control={control}
          rules={{
            required: "Поле обязательно",
            validate: (value) => {
              if (!value) return "Поле обязательно";
              if (value.length !== 15) {
                return "Артикул должен быть полностью заполнен (все 12 символов)";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <InputWithMask
              id='sku'
              label='Артикул'
              placeholder='XXX-XXX-XXX-XXX'
              mask='***-***-***-***'
              definitions={{ "*": /[A-Za-z0-9]/ }}
              prepare={(str) => str.toUpperCase()}
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              inputRef={field.ref}
              error={errors.sku?.message}
            />
          )}
        />

        <Button type='submit' className={styles.submitBtn}>
          Создать
        </Button>
      </form>
    </Modal>
  );
}

export default AddProductModal;
