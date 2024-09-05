import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import QRPayment from '../components/bank/paymentMethods/QRPayment.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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
      </Previews>
  );
};

export default ComponentPreviews;