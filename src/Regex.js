export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validName = new RegExp(
  // /^(?!.*[\d!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])(?=.*[a-zA-Z]{3,20}$)/

  /^(?!.*[\d!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`])(?=.*[a-zA-Z]{3,20}$)/
);

export const validAge = new RegExp(/^(1[8-9]|[2-9]\d)$/);

export const validPhone = new RegExp(/^\d{10}$/);
