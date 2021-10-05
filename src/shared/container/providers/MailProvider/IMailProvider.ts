interface IMailProvider {
  sendMail(
    to: string,
    from: string,
    subject: string,
    body: string
  ): Promise<void>;
}

export { IMailProvider };
