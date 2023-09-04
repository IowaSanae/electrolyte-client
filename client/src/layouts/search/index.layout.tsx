//? APPS
import { Footer, Header, Chat } from '../../containers';
import useAuth from '../../hooks/userAuth';

export default function SearchLayout({ children }: any) {
  useAuth();
  return (
    <>
      <Header />
      <div className="App">
        <div className="bg-[#f5f5f5] overflow-hidden py-[24px]">
          <div className="grid wide">{children}</div>
        </div>
      </div>
      <Chat />
      <Footer />
    </>
  );
}
