import { runApplication } from './theia-app';

export default function theiaEntry(element) {
    if (element != null) {
        runApplication(element);
    }
}
