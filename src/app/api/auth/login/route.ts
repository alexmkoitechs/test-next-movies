
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';


// // This should be replaced when you have a database
// const users = [
//   { id: 1, email: 'user@test.com', password: '$2a$12$Kd0pbwLzKu9x10NXwum6vu/WTCNTHWsWCUdwwQ90IgdwDwhblLtqa' } // password: 'user-password'
// ];

interface LoginRequestBody {
  email: string;
  password: string;
  rememberMe: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password, rememberMe }: LoginRequestBody = body;

    const user = await prisma.users.findFirst({
      // select: { password: true },
      where: { email },
    });

    const expireDate = rememberMe ? '30d' : '1h';

    if (!user) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    console.log('isPasswordCorrect', isPasswordCorrect);
    console.log('password', password);
    console.log('user', user);
  
    if (!isPasswordCorrect) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  
    const token = jwt.sign({ userId: user.id, email: user.email }, 'secret-key', { expiresIn: expireDate });
  
    return Response.json({ token});
  } catch (err) {
    console.error('Failed to fetch user:', err);
    return Response.json(
      { message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
