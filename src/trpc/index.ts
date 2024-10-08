import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || !user.email)
      throw new TRPCError({code: 'UNAUTHORIZED', message: 'Unauthorized'})

    //check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    })

    //sync the user with the database
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      })
    }

    return{success: true}
    
  })
});


export type AppRouter = typeof appRouter;