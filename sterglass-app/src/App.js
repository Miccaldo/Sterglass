import './App.css';
import { useEffect, useRef } from 'react';
import CookieConsent from "react-cookie-consent";

import MobileLayout from './components/layout/MobileLayout/MobileLayout'
import DesktopLayout from './components/layout/DesktopLayout/DesktopLayout'
import TabletLayout from './components/layout/TabletLayout/TabletLayout'


function App() {

  const refs = {
    home: useRef(),
    about_us: useRef(),
    services: useRef(),
    offer: useRef(),
    customers: useRef(),
    contact: useRef()
  }

  useEffect(() => {
    document.body.style.overflow = 'auto'
  }, [])

  return (
    <div className="App" ref={refs.home}>
      <DesktopLayout refs={refs}></DesktopLayout>
      <TabletLayout refs={refs}></TabletLayout>
      <MobileLayout refs={refs}></MobileLayout>

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonClasses='app-cookie-button'
        expires={150}
      >
        <p style={{fontFamily: 'Lato'}}>This website uses cookies to enhance the user experience. By clicking "Accept", you consent to the use of all the cookies.{" "}</p>
      </CookieConsent>
    </div>
  );
}

export default App;
