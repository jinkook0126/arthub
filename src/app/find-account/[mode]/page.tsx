import FindEmail from '../_component/FindEmail';
import FindPassword from '../_component/FindPassword';

type Props = {
  params: { mode: 'email' | 'password' };
};
function FindAccountPage({ params }: Props) {
  if (params.mode === 'email') return <FindEmail />;
  return <FindPassword />;
}

export default FindAccountPage;
