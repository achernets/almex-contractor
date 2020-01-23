export const mrkClient = data => {
  return new MrkClient({
    chief: false,
    birthDate: -1,
    contacts: [mrkContactInfo({
      cType: MrkContactType.EMAIL
    }), mrkContactInfo({
      cType: MrkContactType.PHONE
    })],
    ...data
  });
};

export const mrkContactInfo = data => {
  return new MrkContactInfo({
    cType: MrkContactType.EMAIL,
    ...data
  });
};

export const mrkOrganization = data => {
  return new MrkOrganization({
    ...data
  });
};