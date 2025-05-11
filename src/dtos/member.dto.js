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
    id: member.id,
    email: member.email,
    name: member.name,
    gender: member.gender,
    age: member.age,
    address: member.address,
    specAddress: member.spec_address,
    phoneNumber: member.phone_number,
    preferences: preferences.map(p => p.category_id)
  };
};

export const responseFromMemberReviews = (reviews) => {
  return reviews.map((review) => {
    return {
      id: review.id,
      body: review.body,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      storeName: review.store.name,
    };
  });
}

