package com.catolica.terraz.dto.request;

import com.catolica.terraz.dto.FactorDTO;
import com.catolica.terraz.dto.TractDTO;
import java.util.List;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestQuoteDTO {
  private Long id;
  private TractDTO tract;
  private List<FactorDTO> factors;
  private Double lotCount;
}
