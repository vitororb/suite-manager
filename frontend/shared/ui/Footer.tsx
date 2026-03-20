type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
    <footer className="flex items-center justify-between w-screen h-10 px-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <p>Livre</p>
          <span className="flex items-center justify-center w-5 h-5 bg-white text-black rounded-sm">
            4
          </span>
        </div>
        <div className="flex items-center gap-1">
          <p>Ocupados</p>
          <span className="flex items-center justify-center w-5 h-5 bg-white text-black rounded-sm">
            1
          </span>
        </div>
      </div>

      <div>Sábado, 15 de Junho de 2023 - 10:00</div>
    </footer>
  );
};
