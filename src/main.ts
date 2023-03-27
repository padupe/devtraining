import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // Recurso para validar dados nas requisições
    app.useGlobalPipes(
        new ValidationPipe({
            // Ativamos o recurso 'Lista Branca', permitindo dados apenas na estrutura definida
            whitelist: true,
            // Não pertite que sejam enviadas informações que não estão listadas (se não estiver definido no DTO, a requisição retorna ERRO)
            forbidNonWhitelisted: true,
            // Transforma os dados recebidos em um "tipo" (no caso com base nos DTOs)
            transform: true,
        })
    )
    await app.listen(3000)
}
bootstrap()
