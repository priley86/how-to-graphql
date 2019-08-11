import { idArg, objectType, stringArg, booleanArg } from '@prisma/nexus';
import { getUserId } from '../utils';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return userId
          ? ctx.photon.users.findOne({
              where: {
                id: userId
              }
            })
          : null;
      }
    });

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.photon.users.findMany({});
      }
    });

    t.list.field('feed', {
      type: 'Post',
      args: {
        published: booleanArg()
      },
      resolve: (parent, { published }, ctx) => {
        return ctx.photon.posts.findMany({
          where: { published }
        });
      }
    });

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true })
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.photon.posts.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString
                }
              },
              {
                content: {
                  contains: searchString
                }
              }
            ]
          }
        });
      }
    });

    t.crud.findOnePost({
      alias: 'post'
    });

    // the above is the same as:
    // t.field('post', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (parent, { id }, ctx) => {
    //     return ctx.photon.posts.findOne({
    //       where: {
    //         id
    //       }
    //     });
    //   }
    // });
  }
});
