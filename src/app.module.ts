import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth/auth.model';
@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal:true}),  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Root@123',
    database: 'loginwhatsapp',
    models: [Auth],
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
