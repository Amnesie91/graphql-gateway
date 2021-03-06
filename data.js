module.exports = {
  accounts: [
    {
      id: "12345",
      name: "Alice",
      email: "alice@email.com",
      password: "pAsSWoRd!",
      roles: ["admin"],
      permissions: [
        "read:any_account",
        "read:own_account",
        "read:any_car",
        "read:own_car",
        "read:any_legend",
        "read:own_legend",
        "write:own_account",
        "write:own_car",
        "write:any_car",
        "write:own_legend",
        "write:any_legend",
        "write:own_skill",
        "write:any_skill",
      ],
    },
    {
      id: "67890",
      name: "Bob",
      email: "bob@email.com",
      password: "pAsSWoRd!",
      roles: ["subscriber"],
      permissions: [
        "read:own_account",
        "read:own_car",
        "write:own_car",
        "read:own_legend",
        "write:own_legend",
        "read:own_skill",
        "write:own_skill",
      ],
    },
  ],
  jwts: [],
  legends: [],
  skills: [],
  images: [],
  posts: [],
};
