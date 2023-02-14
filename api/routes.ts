import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { compareSync, hashSync } from "https://deno.land/x/bcrypt/mod.ts";
import * as djwt from "https://deno.land/x/djwt/mod.ts";
import { create, verify, Payload, Header ,getNumericDate } from "https://deno.land/x/djwt/mod.ts";

import { User, users } from "./users.ts";
import { favs } from "./favs.ts";


 export const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" },true,["sign", "verify"])


export const getFavs =  (ctx:RouterContext) => {
  const { username } = ctx.state.currentUser;
  ctx.response.status = 200;
  ctx.response.body = { favs: favs[username] };
};

export const deleteFav =  (ctx:RouterContext) => {
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

export const postFav =  (ctx:RouterContext) => {
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

export const postLogin = async(ctx:RouterContext) => {
  
  const body = await ctx.request.body({type: "json"});
  const data = await body.value
  console.log(data)
  
  const username = data.username;
  const password = data.password;
  console.log(username)
  console.log(password)

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
    
    const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, key);
    
    console.log(user)
    console.log(jwt)
    ctx.response.status = 201;
    ctx.response.body =  jwt ;
 
    
  }
};

export const postRegister = async (ctx:RouterContext) => {
  const body = await ctx.request.body();
  const data = await body.value
  //console.log(data)
  
  const username = data.username;
  const password = data.password;

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
