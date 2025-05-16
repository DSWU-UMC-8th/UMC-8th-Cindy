export const bodyToMember = (body) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    age: body.age,
    address: body.address,
    specAddress: body.specAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromMember = ({ member, preferences }) => {
  return {
    id: member.id.toString(),
    name: member.name,
    gender: member.gender,
    age: member.age,
    address: member.address,
    specAddress: member.spec_address,
    phoneNumber: member.phone_number,
    email: member.email,
    preferences: preferences.map(p => p.categoryId.toString())
  };
};

export const responseFromMemberReviews = (reviews) => {
  return reviews.map((review) => {
    return {
      id: review.id.toString(),
      body: review.body,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      storeName: review.store.name,
    };
  });
}

