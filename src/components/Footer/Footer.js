import React from "react";
import keshaLogo from "./kesha_logo.png";

const Footer = () => {
  return (
    <div className="mt-auto" >
      <footer >
        <div className="footer_container">
          <img src={keshaLogo} alt="" />
          <p>
            Üstünlik zähmetiň, bilimiň we çydamlylygyñ netijesidigine ynanýarys.
            Berlen mysallar adaty bolmak üçin niýetlenen däldir we netijeler hiç
            haçan kepillendirilmeýär. Berilýän maglumatlar diňe bilim maksatly
            bolup, kanuny ýa-da maliýe maslahatyny düzmeýär. Bu web sahypasyny
            ýa-da oňa bagly islendik materialy ulanmak bilen, öz netijeleriňiz
            üçin doly jogapkärçiligi öz üstüňize alýarsyňyz.
          </p>
          <p>
            Biziň komandamyz sizi goldamak maksady bilen bu ýerde, ýöne siz
            inwestisiýa we risk etmezden öñ seresaplylygy berjaý etmelisiñiz.
            Üstünlik - bu siziñ borjuñyz we jogapkärçiligiñizdir. Ähli hukuklar
            goragly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
