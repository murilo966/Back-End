import { DataSource } from 'typeorm';
import { SerieEntity } from '../serie/serie.entity';

export const serieProvider = [
  {
    provide: 'SERIE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SerieEntity),
    inject: ['DATA_SOURCE'],
  },
];