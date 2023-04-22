import 'firecms';
import { FirebaseCMSApp } from 'firecms/dist/firebase_app/FirebaseCMSApp';
declare module 'firecms' {
  export interface FirebaseCMSApp {
    FirebaseCMSApp: typeof FirebaseCMSApp;
  }
}
