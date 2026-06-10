import dotenv from 'dotenv';

dotenv.config();

export function validateEnv(): void {
    if (!process.env.PORT) {
        console.error("[erro]: A variável de ambiente PORT não foi definida no arquivo .env!");
        process.exit(1); // Fecha o servidor imediatamente se houver erro
    }

    const portNum = parseInt(process.env.PORT, 10);
    if (isNaN(portNum)) {
        console.error("[erro]: A variável PORT no arquivo .env precisa ser um número válido!");
        process.exit(1);
    }
}