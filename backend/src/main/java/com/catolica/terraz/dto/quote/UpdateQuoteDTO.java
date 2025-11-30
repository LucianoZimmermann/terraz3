package com.catolica.terraz.dto.quote;

import com.catolica.terraz.dto.FactorDTO;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateQuoteDTO {
    private Long id;
    private Long tractId;
    private List<FactorDTO> factors;
    private BigDecimal lotCount;
    private BigDecimal tractOwnerLotCount;
    private BigDecimal pricePerLot;
    private BigDecimal totalFactorsPrice;
}
