type Item = { pregunta: string; respuesta: string };

const FAQ = ({ titulo, items }: { titulo: string; items: Item[] }) => (
  <div>
    <h3 className="text-lg font-bold text-[#0F172A] mb-6 text-center">
      {titulo}
    </h3>
    <div className="divide-y divide-[#E2E8F0] max-w-2xl mx-auto">
      {items.map((item) => (
        <details key={item.pregunta} className="group py-4 cursor-pointer">
          <summary className="flex items-center justify-between text-sm font-medium text-[#0F172A] list-none">
            {item.pregunta}
            <svg
              className="shrink-0 group-open:rotate-180 transition-transform"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <p className="text-[#64748B] text-sm mt-3 leading-relaxed">
            {item.respuesta}
          </p>
        </details>
      ))}
    </div>
  </div>
);

export default FAQ;
