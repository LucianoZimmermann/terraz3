package com.catolica.terraz.dto.quote;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.dto.TractDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseQuoteDTO {
  private Long id;
  private TractDTO tract;
  private List<FactorDTO> factors;
  private BigDecimal lotCount;
  private BigDecimal tractOwnerLotCount;
  private BigDecimal pricePerLot;
  private BigDecimal totalFactorsPrice;
  private BigDecimal totalProfit;
  private BigDecimal totalLiquidProfit;
  private BigDecimal markup;
  private LocalDateTime createDate;
}
