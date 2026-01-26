import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.post('/auth/register', async (req, res) => {
  const { nome, email, password, telefone, cep, rua, numero, bairro, cidade, estado } = req.body;
  if (!nome || !email || !password || !telefone || !cep || !rua || !numero || !bairro || !cidade || !estado) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        Nome: nome,
        email,
        passwordHash,
        telefone,
        cep,
        rua,
        numero: Number(numero),
        bairro,
        cidade,
        estado
      }
    });
    res.json({ success: true, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

app.get('/auth/confirm', async (req, res) => {
  const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Token de confirmação não fornecido.' });
    const user = await prisma.user.findFirst({ where: { confirmationToken: token } });
    if (!user) return res.status(400).json({ error: 'Token de confirmação inválido.' });
    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date(), confirmationToken: null }
    });
    res.json({ success: true, message: 'Email confirmado com sucesso.' });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Preencha email e senha.' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado.' });
  }
  if (!user.emailVerifiedAt) {
    return res.status(401).json({ error: 'Email não confirmado.' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }
  // Gera o token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email, nome: user.primeiroNome },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ success: true, token });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não enviado.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

app.get('/profile', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  res.json({ user });
});

// iniciar o servidor
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});