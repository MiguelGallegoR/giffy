import { Context } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import { verify, validate } from "https://deno.land/x/djwt/mod.ts"
import { users, User } from "./users.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

import {key} from './routes.ts'


console.log(await load());

/*
Deno.env.set("JWT_KEY", 'Valor de jwt key');
const jwt_key = Deno.env.get("JWT_KEY");
console.log(jwt_key);
*/
//const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" },true,["sign", "verify"])



const userMiddleware = async (ctx:Context, next:Function) => {
  // Get JWT from request if available
  const body = await ctx.request.body();
  let {jwt} =  await body.value
  
  if (!jwt) {
    jwt = ctx.request.headers.get('Authorization')
  }

  console.log('using: ', {jwt})

  if (jwt) {
    // Validate JWT and if it is invalid delete from cookie
   
    const data = await verify(jwt, key || '');
    
    if (!data.isValid || data.isExpired) {
      ctx.cookies.delete('jwt');
      ctx.response.status = 401
    } else if (data) {
      // If it is valid select user and save in context state
      const user: any = users.find((u: User) => u.username === data.iss);
      ctx.state.currentUser = user;
      console.log('found', {user})
      await next();
    } else {
      ctx.cookies.delete('jwt');
      await next();
    }
  } else {
    ctx.state.currentUser = null;
    await next();
  }
}

export {userMiddleware};