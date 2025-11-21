package com.catolica.terraz.dto.thirdparty;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateThirdPartyDTO {
    private Long id;
    private String name;
    private String cnpj;
    private Long factorTypeId;
}
