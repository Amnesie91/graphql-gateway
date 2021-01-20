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
        "write:own_car",
      ],
    },
    {
      id: "67890",
      name: "Bob",
      email: "bob@email.com",
      password: "pAsSWoRd!",
      roles: ["subscriber"],
      permissions: ["read:own_account", "read:own_car", "write:own_car"],
    },
  ],
  cars: [
    {
      id: "66667",
      name: "E Klasse",
      userId: "12345",
    },
    {
      id: "11116",
      name: "A Klasse",
      userId: "67890",
    },
    {
      id: "99998",
      name: "C Klasse",
      userId: "67890",
    },
  ],
  jwts: [],
};
