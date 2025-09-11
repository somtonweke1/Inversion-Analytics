import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Simple admin authentication - in production, use proper password hashing
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@axiomanalytics.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: 'admin',
            email: adminEmail,
            name: 'Admin User',
            role: 'admin'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
}





