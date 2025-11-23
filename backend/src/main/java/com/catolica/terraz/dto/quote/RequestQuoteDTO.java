package com.catolica.terraz.dto.quote;

import com.catolica.terraz.dto.FactorDTO;

import java.math.BigDecimal;
import java.util.List;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestQuoteDTO {
  private Long id;
  private List<FactorDTO> factors;
  private BigDecimal lotCount;
}
