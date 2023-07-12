// @ts-nocheck
const { PrismaClient } = require("@prisma/client");
const data = require("../challenge/starter-code/data.json");
var cuid = require('cuid');


const prisma = new PrismaClient();

async function main() {
  // console.log(data);

  /**
   * Generate users from input
   */
  const inputUsers = [];

  data.productRequests.forEach((productRequest) => {
    productRequest.comments?.forEach((comment) => {
      inputUsers.push(comment.user);
      comment.replies?.forEach((reply) => {
        inputUsers.push(reply.user);
      });
    });
  });

  //remove duplicates
  const usernames = inputUsers.map(({ username }) => username);
  const uniqueUsers = inputUsers.filter(
    ({ username }, index) => !usernames.includes(username, index + 1)
  );

  /**
   * Write users to db
   */
  const dbUsers: User[] = [];
  for await (const user of uniqueUsers) {
    const dbUser = await prisma.user.create({
      data: {
        image: user.image.slice(1),
        username: user.username,
      },
    });
    dbUsers.push(dbUser);
  }

  console.log("Inserted users into db: \r\n", dbUsers);

  /**
   * Generate feedbacks from input
   * Uses random authorId because input does not provide author
   */

  const feedbacks = data.productRequests.map((productRequest) => ({
    title: productRequest.title,
    description: productRequest.description,
    category: productRequest.category,
    status: productRequest.status,
    authorId: dbUsers[Math.floor(Math.random() * (dbUsers.length-1))].id, //random id between min and max
  }));

  /**
   * Write feedbacks to db
   */
  const dbFeedbacks: Feedback[] = [];
  for await (const feedback of feedbacks) {
    const dbFeedback = await prisma.feedback.create({
      data: feedback,
    });
    dbFeedbacks.push(dbFeedback);
  }

  console.log("Inserted feedbacks into db: \r\n", dbFeedbacks);

  /**
   * Generate comments from input
   */
  let nextCommentId = 1;
  const comments: Comment[] = [];
  data.productRequests.forEach((productRequest) => {
    productRequest.comments?.forEach((comment) => {
      const newComment = {
        id: cuid(),
        content: comment.content,
        feedbackId: dbFeedbacks.find(({ title }) => title === productRequest.title).id,
        authorId: dbUsers.find(
          ({ username }) => username === comment.user.username
        ).id,
      };
      comments.push(newComment);
      comment.replies?.forEach((reply) => {
        const newReply = {
          id: cuid(),
          content: reply.content,
          feedbackId: newComment.feedbackId,
          authorId: dbUsers.find(
            ({ username }) => username === reply.user.username
          ).id,
          replyingToCommentId: newComment.id,
          replyingToUserId: dbUsers.find(
            ({ username }) => username === reply.user.username
          ).id,
        };
        comments.push(newReply);
      });
    });
  });

  /**
   * Insert comments into db
   */
  const dbComments: Comment[] = [];
  for await (const comment of comments) {
    const dbComment = await prisma.comment.create({
      data: comment,
    });
    dbComments.push(dbComment);
  }

  console.log("Inserted comments into db: \r\n", dbComments);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
