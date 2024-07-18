import { DataSource } from 'typeorm'
import { DatabaseConfig } from '../configs/database'

export const connection = new DataSource(DatabaseConfig)