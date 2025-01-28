import React, { useState, useEffect } from 'react';
import styles from "./styles.css";

const CookieBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (cookieAccepted) {
      setVisible(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className={styles.cookieBar}>
          <div className={styles.cookieBar__container}>
            <div className={styles.cookieBar__wrapper}>
              <p>
                Coletamos dados para melhorar o desempenho e segurança do site, além de personalizar conteúdo e anúncios. Você pode conhecer os <a href="https://featrefactothome--eurico.myvtex.com/termosdeuso">Termos de uso</a> e conferir nossa <a href="https://featrefactothome--eurico.myvtex.com/institucional/nossas-politicas">Política de Privacidade.</a>
              </p>
              <button
                type="button"
                onClick={handleAcceptCookies}
              >
                ENTENDI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieBar;
