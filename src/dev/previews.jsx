import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import SignInFederation from '../modules/federation/SignInFederation.jsx';
import SignUpFederation from '../modules/federation/SignUpFederation.jsx';

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <ComponentPreview path="/SignInFederation">
          <SignInFederation/>
        </ComponentPreview>
        <ComponentPreview path="/SignUpFederation">
          <SignUpFederation/>
        </ComponentPreview>
      </Previews>
  );
};

export default ComponentPreviews;