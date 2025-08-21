//import App from './App';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import './assets/scss/Saas.scss';
//import './pages/Landing/assets/css/meanmenu.min.css';
import App from './App';
import { createBrowserHistory } from "history";
export {createBrowserHistory};
import { Auth0Provider, AuthorizationParams, CacheLocation, ICache, User,AppState } from "@auth0/auth0-react";
import { ReactNode } from 'react';

interface Auth0ProviderOptions {
  auth0Client?: {
      env?: {
          [key: string]: string;
      };
      name: string;
      version: string;
  };
  authorizationParams?: AuthorizationParams;
  authorizeTimeoutInSeconds?: number;
  cache?: ICache;
  cacheLocation?: CacheLocation;
  children?: ReactNode;
  clientId: string;
  cookieDomain?: string;
  domain: string;
  httpTimeoutInSeconds?: number;
  issuer?: string;
  leeway?: number;
  legacySameSiteCookie?: boolean;
  nowProvider?: (() => number | Promise<number>);
  onRedirectCallback?: ((appState?: AppState, user?: User) => void);
  sessionCheckExpiryDays?: number;
  skipRedirectCallback?: boolean;
  useCookiesForTransactions?: boolean;
  useFormData?: boolean;
  useRefreshTokens?: boolean;
  useRefreshTokensFallback?: boolean;
  workerUrl?: string;
}
const configJson ={
	"domain": "dev-twjztmiqhzxp7q86.us.auth0.com",
	"clientId": "PWRk5jrUhNW8zlKCG3RX5OosTTP54Mb9",
	"audience": "https://api.certificados.com",
  "redirectUri": window.location.origin + '/dashboard/tarjetas/callback',
  }
export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  const audience =
    configJson.audience && configJson.audience !== "https://api.certificados.com"
      ? configJson.audience
      : null;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}

const onRedirectCallback = (appState:any) => {
	const history = createBrowserHistory()
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig :Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const container = document.getElementById('hyper');
if (container) {
	const root = createRoot(container);

	root.render(
		<HashRouter basename={process.env.PUBLIC_URL}>
			<Auth0Provider
				{...providerConfig}
			>
			<App />
			</Auth0Provider>
		</HashRouter>
	);
}
