import { DataSource } from 'typeorm';
import { Serie } from '../serie/serie.entity';

export const serieProvider = [
  {
    provide: 'SERIE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Serie),
    inject: ['DATA_SOURCE'],
  },
];