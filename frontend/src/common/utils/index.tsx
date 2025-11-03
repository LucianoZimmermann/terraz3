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
      return factorTypeEnum.toLowerCase();
  }
}

export function renderQuoteFeasibility(feasibilityEnum: string) {
  switch (feasibilityEnum) {
    case "NOT_FEASIBLE":
      return "Não viável";
    case "LOW_PROFIT":
      return "Baixa lucratividade";
    case "PROFITABLE":
      return "Lucrativo";
    case "VERY_PROFITABLE":
      return "Muito lucrativo";
    default:
      return feasibilityEnum.toLowerCase();
  }
}
