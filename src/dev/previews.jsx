import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import QRPayment from '../components/payment/QRPayment.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../modules/hooks/useAuth.jsx';
import CardAtmComponents from '../components/atm/CardAtmComponents.jsx';
import SignUpPage from '../modules/federation/SignUpPage.jsx';

const client = new QueryClient();

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <QueryClientProvider client={client}>
          <ComponentPreview path="/QRPayment">
            <QRPayment/>
          </ComponentPreview>
        </QueryClientProvider>
        <ComponentPreview path="/PaletteTree">
          <PaletteTree/>
        </ComponentPreview>
        <ComponentPreview path="/AuthProvider">
          <AuthProvider/>
        </ComponentPreview>
        <ComponentPreview path="/CardAtmComponents">
          <CardAtmComponents/>
        </ComponentPreview>
        <ComponentPreview path="/QRPayment">
          <QRPayment/>
        </ComponentPreview>
        <ComponentPreview path="/SignUpPage">
          <SignUpPage/>
        </ComponentPreview>
      </Previews>
  );
};

export default ComponentPreviews;