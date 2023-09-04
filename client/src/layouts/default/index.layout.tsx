//? LIBRARY
import './style/heart.css';
import SVG from '../../assets/svgs';
import { Toaster } from 'react-hot-toast';
//? APPS
import { RootState } from '../../app/store';
import { useAppSelector } from '../../hooks/hooks';
import { Footer, Header, Chat } from '../../containers';
import useAuth from '../../hooks/userAuth';

export default function DefaultLayout({ children }: any) {
  useAuth();
  const { heart } = useAppSelector((state: RootState) => state.others);
  return (
    <div className="app">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      {heart && <div className="heart-animation2">{SVG.HEART}</div>}
      {children}
      <Chat />
      <Footer />
    </div>
  );
}
