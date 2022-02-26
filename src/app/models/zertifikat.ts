import { Kunde } from './kunde';
import { Testung } from './testung';

export interface Zertifikat {
  kunde: Kunde;
  testung: Testung;
}
