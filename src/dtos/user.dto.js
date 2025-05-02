export const bodyToUser = (body) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    age: body.age,
    address: body.address || "",
    specAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ member, preferences }) => {
  return {
    id: member.id,
    email: member.email,
    name: member.name,
    gender: member.gender,
    age: member.age,
    address: member.address,
    specAddress: member.spec_address,
    phoneNumber: member.phone_num,
    preferences: preferences.map(p => p.category_id)
  };
};
