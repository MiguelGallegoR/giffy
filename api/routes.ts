import { RouterMiddleware } from "https://deno.land/x/oak/mod.ts";
import { compareSync, hashSync } from "https://deno.land/x/bcrypt/mod.ts";
import * as djwt from "https://deno.land/x/djwt/mod.ts";
import { type Header } from "https://deno.land/x/djwt/mod.ts";
import { create, verify, decode, getNumericDate } from "https://deno.land/x/djwt/mod.ts";

import { User, users } from "./users.ts";
import { favs } from "./favs.ts";


const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);


export const getFavs:RouterMiddleware<string> =  (ctx) => {
  const { username } = ctx.state.currentUser;
  ctx.response.status = 200;
  ctx.response.body = { favs: favs[username] };
};

export const deleteFav:RouterMiddleware<string> =  (ctx) => {
  const { id } = ctx.params;
  const { username } = ctx.state.currentUser;
  favs[username] = favs[username].filter(
    (favId: string) => favId !== id,
  );

  console.log({
    idRemoved: id,
    remainingFavs: favs[username],
    username,
  });

  ctx.response.body = { favs: favs[username] };
  ctx.response.status = 200;
};

export const postFav:RouterMiddleware<string> =  (ctx) => {
  const { id } = ctx.params;
  const { username } = ctx.state.currentUser;

  const alreadyExist = favs[username].some(
    (favId: string) => favId === id,
  );
  if (!alreadyExist) {
    favs[username].push(id);
  }

  console.log({
    alreadyExist,
    favs: favs[username],
    username,
  });

  ctx.response.body = { favs: favs[username] };
  ctx.response.status = 201;
};

export const postLogin:RouterMiddleware<string> = async(ctx) => {
  const { value } = ctx.request.body();
  const { username, password } = await value;

  const user: any = users.find((u: User) => u.username === username);

  if (!user) {
    ctx.response.status = 403;
  } else if (!compareSync(password, user.password)) {
    ctx.response.status = 403;
  } else {
    
    const payload = {
        iss: user.username,
        exp: getNumericDate(new Date("2023-02-01"))
    };
    
    const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, key);
    
    

    ctx.response.status = 201;
    ctx.response.body = { jwt };
  }
};

export const postRegister:RouterMiddleware<string> = async (ctx) => {
  const { value } =  ctx.request.body();
  const { username, password } = await value;

  const hashedPassword = hashSync(password);

  const user: User = {
    username,
    password: hashedPassword,
  };

  // TODO: Check it doesn't exist yet
  const alreadyExist = users.find((user) => user.username === username);
  if (alreadyExist) {
    ctx.response.status = 409;
  } else {
    users.push(user);
    // initialize the user favs
    favs[username] = [];
    ctx.response.status = 201;
  }
};
