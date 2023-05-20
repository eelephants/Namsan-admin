import { GoogleAuthProvider } from 'firebase/auth';
import {
  createCMSDefaultTheme,
  FirebaseAuthController,
  useBuildModeController,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  useValidateAuthenticator,
  useBrowserTitleAndIcon,
} from 'firecms';
import { firebaseConfig } from '../api/firebase';
import { useMemo } from 'react';
import favicon from '../../src/assets/favicon.png';

const DEFAULT_SIGN_IN_OPTIONS = [GoogleAuthProvider.PROVIDER_ID];

export default function UseCms() {
  const signInOptions = DEFAULT_SIGN_IN_OPTIONS;
  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
  } = useInitialiseFirebase({ firebaseConfig });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const dataSource = useFirestoreDataSource({
    firebaseApp,
  });

  useBrowserTitleAndIcon('NAMSAN', favicon);

  const storageSource = useFirebaseStorageSource({ firebaseApp });
  const modeController = useBuildModeController();
  const theme = useMemo(
    () => createCMSDefaultTheme({ mode: modeController.mode }),
    [modeController.mode],
  );

  const { canAccessMainView } = useValidateAuthenticator({
    authController,
    authentication: async ({ user }: { user: any }) => {
      console.log('Allowing access to', user?.email);
      return true;
    },
    dataSource,
    storageSource,
  });

  const isDarkMode = modeController.mode === 'dark';

  return {
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
    authController,
    dataSource,
    storageSource,
    modeController,
    theme,
    canAccessMainView,
    firebaseApp,
    signInOptions,
    isDarkMode,
  };
}
