import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale";

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
    <footer className="flex items-center justify-between w-screen h-8 px-2.5 border-t border-white/10">
      {/* TODO: Add info about the suites */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-available" />
          <p>Livre</p>
          <span className="text-available">4</span>
        </div>
      </div>

      <span className="text-sm">
        {formatDate(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })}{" "}
        — {formatDate(new Date(), "HH:mm")}
      </span>
    </footer>
  );
};
