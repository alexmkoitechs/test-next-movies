
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { type NextRequest } from 'next/server';

interface LoginRequestBody {
  email: string;
  password: string;
  rememberMe: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, rememberMe }: LoginRequestBody = body;
    const expireDate = rememberMe ? '30d' : '1h';

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

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
