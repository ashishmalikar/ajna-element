import { classModule } from './class';
import { attributesModule } from './attributes'
import { eventListenersModule } from './eventsListeners';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { propsModule } from 'snabbdom/build/package/modules/props';

export const modules = [
  classModule ,
  attributesModule,
  eventListenersModule,
  styleModule,
  propsModule
]