import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

const {MongoClient, ObjectId} = require("mongodb");
const mongoURI = "mongodb+srv://yoyo17233:databasepassword@a3db.nouer.mongodb.net/?retryWrites=true&w=majority&appName=a3db";
const client = new MongoClient(mongoURI);

async function connectDB() {
  try {
      await client.connect();
      console.log("Connected to MongoDB ✅");
      // await solveCollection.deleteMany({}); UNCOMMENTING THIS LINE WILL DELETE ALL SOLVES IN THE DB
  }   
  catch (err) {
      console.error("MongoDB Connection Error:", err);
  }
}


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          await connectDB();
          const db = client.db("a4database");
          const userCollection = db.collection("users");
          const user = await userCollection.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          // Simple password check (NOT SECURE, use bcrypt in production)
          if (user.password !== credentials.password) {
            console.log("Incorrect password");
            return null;
          }

          return { id: user._id.toString(), email: user.email };
        } catch (err) {
          console.error("Authorization error:", err);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/Iogin",
  },
  session: {
    strategy: "jwt",
  }
})

export { handler as GET, handler as POST}