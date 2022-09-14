import renderer from 'react-test-renderer';
import PostDetails from './Components/PostDetails'

test('renders correctly', () => {
    const tree = renderer
      .create(< PostDetails />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });