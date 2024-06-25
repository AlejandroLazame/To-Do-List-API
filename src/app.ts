import express  from 'express';
import 'dotenv/config';
import tasksRouter from './api/routes/Tasks';

//Instancia do Servidor
const app = express();
const porta = process.env.Porta ?? 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
app.get('/',(req,res)=>{
    res.status(200).json('✅ API Running OK');
});

app.use('/api',tasksRouter);

//Inicia o Servidor
app.listen(porta, ()=>{
    console.log(`✅ Servidor rodando em http://localhost:${porta}`);
})