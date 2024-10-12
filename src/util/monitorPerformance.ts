import { getPerformance } from 'firebase/performance';
import { firebase } from './firebase';

export const monitorPerformance = () => getPerformance(firebase);
