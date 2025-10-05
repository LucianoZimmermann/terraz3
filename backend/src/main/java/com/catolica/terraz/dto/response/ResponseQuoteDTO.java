package com.catolica.terraz.dto.response;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.dto.TractDTO;
import com.catolica.terraz.enums.FeasibilityEnum;
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
  private Double lotCount;
  private Double pricePerLot;
  private Double totalFactorsPrice;
  private FeasibilityEnum feasibility;
  private LocalDateTime createDate;
}
