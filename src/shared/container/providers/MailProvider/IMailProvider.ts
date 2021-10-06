interface IMailProvider {
  sendMail(
    to: string,
    from: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
