export function maskCPF(cpf: string) {
  const s = cpf?.replace(/\D/g, "") ?? "";
  return s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function renderFactorType(factorTypeEnum: string) {
  switch (factorTypeEnum) {
    case "HYDRO_SANITARY_SYSTEM":
      return "Sistema hidro sanitário";
    case "RAINWATER_DRAINAGE_SYSTEM":
      return "Sistema de drenagem pluvial";
    case "PAVING":
      return "Pavimentação";
    case "EARTHWORK":
      return "Terraplenagem";
    case "ELECTRICAL_NETWORK":
      return "Rede elétrica";
    default:
      return factorTypeEnum;
  }
}
